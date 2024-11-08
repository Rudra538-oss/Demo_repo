from django.shortcuts import render
from django.http import HttpResponse
#from django.views.decorators.clickjacking import xframe_options_sameorigin,xframe_options_deny,xframe_options_exempt
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import xml.etree.ElementTree as ET
from django.db import models
from MaterialHandling.models import XMII_TG_PSET
import os
import fnmatch
import psycopg2
import pandas as pd
from saxonche import PySaxonProcessor


# Create your views here.
#@xframe_options_exempt
@csrf_exempt
def home(request):
	sql = '''SELECT * from public."MaterialHandling_xmii_tg_pset" ORDER BY id ASC LIMIT 100'''
	res = runSQL(sql)
	#keys = res._metadata.keys._keys
	#print(keys)
	products = XMII_TG_PSET.objects.all().values()
	products_list = list(products)
	df = pd.DataFrame(products_list)
	print(runXQuery(df.to_xml()))
	return render(request,"CustomMenu/index.html");

def runSQL(sql_query):
	dbEngine = settings.DATABASES['default']['ENGINE']
	dbHost = settings.DATABASES['default']['HOST']
	dbUsername = settings.DATABASES['default']['USER']
	dbPassword = settings.DATABASES['default']['PASSWORD']
	dbName = settings.DATABASES['default']['NAME']
	dbPort = settings.DATABASES['default']['PORT']
	conn = psycopg2.connect( 
        database=dbName, user=dbUsername,  
        password=dbPassword, host=dbHost, port=dbPort
    ) 
	conn.autocommit = True
	cursor = conn.cursor()
	cursor.execute(sql_query)
	results = cursor.fetchall() 
	conn.commit() 
	conn.close()
	return results

def runXQuery(xml):
	#print(xml)
	with PySaxonProcessor() as proc:
		xqproc = proc.new_xquery_processor()
		document = proc.parse_xml(xml_text=xml)
		xqproc.set_context(xdm_item=document)
		#bls_file_path = "C:/Users/01065H744/Desktop/bls2groovy/SCMI153_CustomMappingTransaction.trx"
		#xqproc.set_context(file_name=bls_file_path)
		result = xqproc.run_query_to_string(query_file='XQUERY/illumFormatter.xq')
		#result = xqproc.run_query_to_value(query_text='for $i in //Action return $i/Name')
		return result

def runXSLT(xml):
	with PySaxonProcessor() as proc:
		xsltproc = proc.new_xslt30_processor()
		document = proc.parse_xml(xml_text=xml)
		executable = xsltproc.compile_stylesheet(stylesheet_file="test.xsl")
		output = executable.transform_to_string(xdm_node=document)
		print(output)
		return output