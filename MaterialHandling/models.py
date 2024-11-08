from django.db import models
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.core.validators import URLValidator

# Create your models here.
# Position: 0 ################ Table DESC: Activity Header ####################
class MPM_ACTIVITY(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	URL_PROGRAM = models.CharField(db_column='URL_PROGRAM',max_length=255,null=True)
	ACTIVITY_TYPE = models.CharField(db_column='ACTIVITY_TYPE',max_length=1,null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	ENABLED = models.CharField(db_column='ENABLED',max_length=1,null=True)
	ACTIVITY_ID = models.CharField(db_column='ACTIVITY_ID',max_length=20,null=False)
	IS_STANDARD_ACT = models.CharField(db_column='IS_STANDARD_ACT',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','ACTIVITY_ID',),)


# Position: 1 ################ Table DESC: Activity Description ####################
class MPM_ACTIVITY_DESC(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	ACTIVITY_ID = models.CharField(db_column='ACTIVITY_ID',max_length=20,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','ACTIVITY_ID','LANG',),)


# Position: 2 ################ Table DESC: Activity Option Description ####################
class MPM_ACTOPTION_DESC(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	OPTION_NAME = models.CharField(db_column='OPTION_NAME',max_length=20,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	ACTIVITY_ID = models.CharField(db_column='ACTIVITY_ID',max_length=20,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','ACTIVITY_ID','OPTION_NAME','LANG',),)


# Position: 3 ################ Table DESC: Activity Option ####################
class MPM_ACT_OPTION(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	OPTION_NAME = models.CharField(db_column='OPTION_NAME',max_length=20,null=False)
	ACTIVITY_ID = models.CharField(db_column='ACTIVITY_ID',max_length=20,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','ACTIVITY_ID','OPTION_NAME',),)


# Position: 4 ################ Table DESC: Activity Option Value ####################
class MPM_ACT_OPTION_VAL(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	OPTION_NAME = models.CharField(db_column='OPTION_NAME',max_length=20,null=False)
	OPTION_VALUE = models.CharField(db_column='OPTION_VALUE',max_length=255,null=True)
	ACTIVITY_ID = models.CharField(db_column='ACTIVITY_ID',max_length=20,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	SEQ = models.IntegerField(db_column='SEQ',null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','ACTIVITY_ID','OPTION_NAME','SEQ',),)


# Position: 5 ################ Table DESC: Master Production Order Relationships ####################
class MPM_AFABL(models.Model):
	AUFNR_NCH = models.CharField(db_column='AUFNR_NCH',max_length=12,null=False)
	DAUTM = models.DecimalField(db_column='DAUTM',max_digits=10,decimal_places=3,null=True)
	ZEINH = models.CharField(db_column='ZEINH',max_length=3,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	KALID = models.CharField(db_column='KALID',max_length=2,null=True)
	AUFNR_VOR = models.CharField(db_column='AUFNR_VOR',max_length=12,null=False)
	VORNR_NCH = models.CharField(db_column='VORNR_NCH',max_length=4,null=False)
	PROVG = models.CharField(db_column='PROVG',max_length=1,null=True)
	PRZNT = models.IntegerField(db_column='PRZNT',null=True)
	VORNR_VOR = models.CharField(db_column='VORNR_VOR',max_length=4,null=False)
	ARBID = models.IntegerField(db_column='ARBID',null=True)
	DAUER = models.DecimalField(db_column='DAUER',max_digits=5,decimal_places=3,null=True)
	DAUERMAX = models.DecimalField(db_column='DAUERMAX',max_digits=5,decimal_places=3,null=True)
	AOBAR = models.CharField(db_column='AOBAR',max_length=2,null=False)

	class Meta:
		unique_together = (('CLIENT','AOBAR','AUFNR_VOR','VORNR_VOR','AUFNR_NCH','VORNR_NCH',),)


# Position: 6 ################ Table DESC: Production Order Sequences ####################
class MPM_AFFLL(models.Model):
	PLNFL = models.CharField(db_column='PLNFL',max_length=6,null=True)
	VORNR1 = models.CharField(db_column='VORNR1',max_length=4,null=True)
	AUFPL = models.CharField(db_column='AUFPL',max_length=10,null=False)
	VORNR2 = models.CharField(db_column='VORNR2',max_length=4,null=True)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=False)
	APLZL = models.CharField(db_column='APLZL',max_length=8,null=False)
	LTXA1 = models.CharField(db_column='LTXA1',max_length=40,null=True)
	AUSCHL = models.CharField(db_column='AUSCHL',max_length=1,null=True)
	FLGAT = models.CharField(db_column='FLGAT',max_length=1,null=True)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','WERKS','AUFNR','AUFPL','APLZL',),)


# Position: 7 ################ Table DESC: Production order header ####################
class MPM_AFKOL(models.Model):
	GLTRP = models.DateField(db_column='GLTRP',null=True)
	REDKZ = models.CharField(db_column='REDKZ',max_length=1,null=True)
	GMEIN = models.CharField(db_column='GMEIN',max_length=3,null=True)
	GLTRI = models.DateField(db_column='GLTRI',null=True)
	AUTYP = models.CharField(db_column='AUTYP',max_length=2,null=True)
	DISPO = models.CharField(db_column='DISPO',max_length=3,null=True)
	VORGZ = models.CharField(db_column='VORGZ',max_length=3,null=True)
	GSTRI = models.DateField(db_column='GSTRI',null=True)
	STATUS = models.CharField(db_column='STATUS',max_length=10,null=True)
	GASMG = models.DecimalField(db_column='GASMG',max_digits=13,decimal_places=3,null=True)
	APROZ = models.DecimalField(db_column='APROZ',max_digits=7,decimal_places=3,null=True)
	PSPEL = models.BinaryField(db_column='PSPEL',null=True)
	GLTRS = models.DateField(db_column='GLTRS',null=True)
	PLAUF = models.DateField(db_column='PLAUF',null=True)
	PLNNR = models.CharField(db_column='PLNNR',max_length=8,null=True)
	GSTRS = models.DateField(db_column='GSTRS',null=True)
	SBMNG = models.DecimalField(db_column='SBMNG',max_digits=13,decimal_places=3,null=True)
	GSTRP = models.DateField(db_column='GSTRP',null=True)
	RMNGA = models.DecimalField(db_column='RMNGA',max_digits=13,decimal_places=3,null=True)
	GAMNG = models.DecimalField(db_column='GAMNG',max_digits=13,decimal_places=3,null=True)
	MATNR_GUID = models.CharField(db_column='MATNR_GUID',max_length=32,null=True)
	GEUZI = models.TimeField(db_column='GEUZI',null=True)
	AUFLD = models.DateField(db_column='AUFLD',null=True)
	SBMEH = models.CharField(db_column='SBMEH',max_length=3,null=True)
	AUART = models.CharField(db_column='AUART',max_length=4,null=True)
	IASMG = models.DecimalField(db_column='IASMG',max_digits=13,decimal_places=3,null=True)
	STLNR = models.CharField(db_column='STLNR',max_length=8,null=True)
	FHORI = models.CharField(db_column='FHORI',max_length=3,null=True)
	RGEKZ = models.CharField(db_column='RGEKZ',max_length=1,null=True)
	FLG_MLTPS = models.CharField(db_column='FLG_MLTPS',max_length=1,null=True)
	STLAN = models.CharField(db_column='STLAN',max_length=1,null=True)
	PLGRP = models.CharField(db_column='PLGRP',max_length=3,null=True)
	PLSVN = models.DecimalField(db_column='PLSVN',max_digits=13,decimal_places=3,null=True)
	GLUZS = models.TimeField(db_column='GLUZS',null=True)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=False)
	PLSVB = models.DecimalField(db_column='PLSVB',max_digits=13,decimal_places=3,null=True)
	BMEINS = models.CharField(db_column='BMEINS',max_length=3,null=True)
	GLUZP = models.TimeField(db_column='GLUZP',null=True)
	BAUMNG = models.DecimalField(db_column='BAUMNG',max_digits=13,decimal_places=3,null=True)
	SICHZ = models.CharField(db_column='SICHZ',max_length=3,null=True)
	IGMNG = models.DecimalField(db_column='IGMNG',max_digits=13,decimal_places=3,null=True)
	STLAL = models.CharField(db_column='STLAL',max_length=2,null=True)
	APRIO = models.CharField(db_column='APRIO',max_length=4,null=True)
	GSUZP = models.TimeField(db_column='GSUZP',null=True)
	RELEASED_QTY = models.DecimalField(db_column='RELEASED_QTY',max_digits=13,decimal_places=3,null=True)
	MATNR_VERSION = models.CharField(db_column='MATNR_VERSION',max_length=10,null=True)
	MATNR_EXTERNAL = models.CharField(db_column='MATNR_EXTERNAL',max_length=40,null=True)
	PLNTY = models.CharField(db_column='PLNTY',max_length=1,null=True)
	LODIV = models.DecimalField(db_column='LODIV',max_digits=13,decimal_places=3,null=True)
	SLSBS = models.DecimalField(db_column='SLSBS',max_digits=13,decimal_places=3,null=True)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=True)
	FEVOR = models.CharField(db_column='FEVOR',max_length=3,null=True)
	FTRMI = models.DateField(db_column='FTRMI',null=True)
	PLNME = models.CharField(db_column='PLNME',max_length=3,null=True)
	GETRI = models.DateField(db_column='GETRI',null=True)
	SLSVN = models.DecimalField(db_column='SLSVN',max_digits=13,decimal_places=3,null=True)
	FREIZ = models.CharField(db_column='FREIZ',max_length=3,null=True)
	FTRMS = models.DateField(db_column='FTRMS',null=True)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=False)
	GSUZS = models.TimeField(db_column='GSUZS',null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	BMENGE = models.DecimalField(db_column='BMENGE',max_digits=13,decimal_places=3,null=True)
	TERKZ = models.CharField(db_column='TERKZ',max_length=1,null=True)
	PLNAL = models.CharField(db_column='PLNAL',max_length=2,null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	CY_SEQNR = models.CharField(db_column='CY_SEQNR',max_length=14,null=True)

	class Meta:
		unique_together = (('CLIENT','WERKS','AUFNR',),)


# Position: 8 ################ Table DESC: AFPOL segment ####################
class MPM_AFPOL(models.Model):
	VERID = models.CharField(db_column='VERID',max_length=4,null=True)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=False)
	AMEIN = models.CharField(db_column='AMEIN',max_length=3,null=True)
	WEBAZ = models.DecimalField(db_column='WEBAZ',max_digits=5,decimal_places=3,null=True)
	SAFNR = models.CharField(db_column='SAFNR',max_length=12,null=True)
	WEMNG = models.DecimalField(db_column='WEMNG',max_digits=13,decimal_places=3,null=True)
	BMENG = models.DecimalField(db_column='BMENG',max_digits=13,decimal_places=3,null=True)
	MATNR_VERSION = models.CharField(db_column='MATNR_VERSION',max_length=10,null=True)
	KDAUF = models.CharField(db_column='KDAUF',max_length=10,null=True)
	MATNR_EXTERNAL = models.CharField(db_column='MATNR_EXTERNAL',max_length=40,null=True)
	LGNUM = models.CharField(db_column='LGNUM',max_length=3,null=True)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=True)
	CHARG = models.CharField(db_column='CHARG',max_length=10,null=True)
	PLNUM = models.CharField(db_column='PLNUM',max_length=10,null=True)
	LGORT = models.CharField(db_column='LGORT',max_length=4,null=True)
	DFREI = models.CharField(db_column='DFREI',max_length=1,null=True)
	MEINS = models.CharField(db_column='MEINS',max_length=3,null=True)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=False)
	PSMNG = models.DecimalField(db_column='PSMNG',max_digits=13,decimal_places=3,null=True)
	MATNR_GUID = models.CharField(db_column='MATNR_GUID',max_length=32,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	KDEIN = models.CharField(db_column='KDEIN',max_length=4,null=True)
	UMREN = models.DecimalField(db_column='UMREN',max_digits=7,decimal_places=3,null=True)
	POSNR = models.CharField(db_column='POSNR',max_length=4,null=False)
	PSAMG = models.DecimalField(db_column='PSAMG',max_digits=13,decimal_places=3,null=True)
	SERNR = models.CharField(db_column='SERNR',max_length=8,null=True)
	KDPOS = models.CharField(db_column='KDPOS',max_length=6,null=True)
	UMREZ = models.DecimalField(db_column='UMREZ',max_digits=7,decimal_places=3,null=True)

	class Meta:
		unique_together = (('CLIENT','WERKS','AUFNR','POSNR',),)


# Position: 9 ################ Table DESC: Production Order Suboperations ####################
class MPM_AFUVL(models.Model):
	XDISP = models.CharField(db_column='XDISP',max_length=1,null=True)
	ZLPRO = models.DecimalField(db_column='ZLPRO',max_digits=9,decimal_places=3,null=True)
	ANZZL = models.IntegerField(db_column='ANZZL',null=True)
	ISDD = models.DateField(db_column='ISDD',null=True)
	LIEGZ = models.FloatField(db_column='LIEGZ',null=True)
	BMSCH = models.DecimalField(db_column='BMSCH',max_digits=13,decimal_places=3,null=True)
	LAR04 = models.CharField(db_column='LAR04',max_length=6,null=True)
	LAR03 = models.CharField(db_column='LAR03',max_length=6,null=True)
	LAR06 = models.CharField(db_column='LAR06',max_length=6,null=True)
	LAR05 = models.CharField(db_column='LAR05',max_length=6,null=True)
	ABRUE = models.FloatField(db_column='ABRUE',null=True)
	SSSLD = models.DateField(db_column='SSSLD',null=True)
	VGWTS = models.CharField(db_column='VGWTS',max_length=4,null=True)
	STEUS = models.CharField(db_column='STEUS',max_length=4,null=True)
	FSSLD = models.DateField(db_column='FSSLD',null=True)
	PEINH = models.DecimalField(db_column='PEINH',max_digits=4,decimal_places=3,null=True)
	RMNGA = models.DecimalField(db_column='RMNGA',max_digits=13,decimal_places=3,null=True)
	TRAZE = models.CharField(db_column='TRAZE',max_length=3,null=True)
	ARBEH = models.CharField(db_column='ARBEH',max_length=3,null=True)
	ARBEI = models.DecimalField(db_column='ARBEI',max_digits=7,decimal_places=3,null=True)
	SSSBZ = models.TimeField(db_column='SSSBZ',null=True)
	RSTZE = models.CharField(db_column='RSTZE',max_length=3,null=True)
	WRTZE = models.CharField(db_column='WRTZE',max_length=3,null=True)
	FSSLZ = models.TimeField(db_column='FSSLZ',null=True)
	IEAVD = models.DateField(db_column='IEAVD',null=True)
	LIGZE = models.CharField(db_column='LIGZE',max_length=3,null=True)
	SPLIM = models.DecimalField(db_column='SPLIM',max_digits=5,decimal_places=3,null=True)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=False)
	ZWNOR = models.DecimalField(db_column='ZWNOR',max_digits=9,decimal_places=3,null=True)
	TRANZ = models.FloatField(db_column='TRANZ',null=True)
	APLZL = models.CharField(db_column='APLZL',max_length=8,null=False)
	UVORN = models.CharField(db_column='UVORN',max_length=4,null=False)
	PREIS = models.CharField(db_column='PREIS',max_length=13,null=True)
	ISDZ = models.TimeField(db_column='ISDZ',null=True)
	VGE05 = models.CharField(db_column='VGE05',max_length=3,null=True)
	VGE04 = models.CharField(db_column='VGE04',max_length=3,null=True)
	VGE06 = models.CharField(db_column='VGE06',max_length=3,null=True)
	VGE01 = models.CharField(db_column='VGE01',max_length=3,null=True)
	CY_SEQNRV = models.CharField(db_column='CY_SEQNRV',max_length=14,null=True)
	VGE03 = models.CharField(db_column='VGE03',max_length=3,null=True)
	VGE02 = models.CharField(db_column='VGE02',max_length=3,null=True)
	ZEITN = models.CharField(db_column='ZEITN',max_length=3,null=True)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	KALID = models.CharField(db_column='KALID',max_length=2,null=True)
	ISAVD = models.DateField(db_column='ISAVD',null=True)
	MGVRG = models.DecimalField(db_column='MGVRG',max_digits=13,decimal_places=3,null=True)
	XMNGA = models.DecimalField(db_column='XMNGA',max_digits=13,decimal_places=3,null=True)
	LAR02 = models.CharField(db_column='LAR02',max_length=6,null=True)
	LAR01 = models.CharField(db_column='LAR01',max_length=6,null=True)
	MEINH = models.CharField(db_column='MEINH',max_length=3,null=True)
	USE05 = models.CharField(db_column='USE05',max_length=3,null=True)
	SSSLZ = models.TimeField(db_column='SSSLZ',null=True)
	USE04 = models.CharField(db_column='USE04',max_length=3,null=True)
	SSEDZ = models.TimeField(db_column='SSEDZ',null=True)
	AUFAK = models.DecimalField(db_column='AUFAK',max_digits=7,decimal_places=3,null=True)
	ZEIMB = models.CharField(db_column='ZEIMB',max_length=3,null=True)
	SSELZ = models.TimeField(db_column='SSELZ',null=True)
	IEDZ = models.TimeField(db_column='IEDZ',null=True)
	FSELD = models.DateField(db_column='FSELD',null=True)
	VGW06 = models.DecimalField(db_column='VGW06',max_digits=9,decimal_places=3,null=True)
	VGW03 = models.DecimalField(db_column='VGW03',max_digits=9,decimal_places=3,null=True)
	VGW02 = models.DecimalField(db_column='VGW02',max_digits=9,decimal_places=3,null=True)
	VGW05 = models.DecimalField(db_column='VGW05',max_digits=9,decimal_places=3,null=True)
	ZEILP = models.CharField(db_column='ZEILP',max_length=3,null=True)
	VGW04 = models.DecimalField(db_column='VGW04',max_digits=9,decimal_places=3,null=True)
	FSEDD = models.DateField(db_column='FSEDD',null=True)
	SPMUS = models.CharField(db_column='SPMUS',max_length=1,null=True)
	ANZMA = models.DecimalField(db_column='ANZMA',max_digits=5,decimal_places=3,null=True)
	VGW01 = models.DecimalField(db_column='VGW01',max_digits=9,decimal_places=3,null=True)
	SSEDD = models.DateField(db_column='SSEDD',null=True)
	ZTMIN = models.DecimalField(db_column='ZTMIN',max_digits=9,decimal_places=3,null=True)
	SSELD = models.DateField(db_column='SSELD',null=True)
	ZMINU = models.DecimalField(db_column='ZMINU',max_digits=9,decimal_places=3,null=True)
	WARTZ = models.FloatField(db_column='WARTZ',null=True)
	FSELZ = models.TimeField(db_column='FSELZ',null=True)
	USR04 = models.DecimalField(db_column='USR04',max_digits=13,decimal_places=3,null=True)
	USR05 = models.DecimalField(db_column='USR05',max_digits=13,decimal_places=3,null=True)
	FSEDZ = models.TimeField(db_column='FSEDZ',null=True)
	ZEIMU = models.CharField(db_column='ZEIMU',max_length=3,null=True)
	ZMINB = models.DecimalField(db_column='ZMINB',max_digits=9,decimal_places=3,null=True)
	RFGRP = models.CharField(db_column='RFGRP',max_length=10,null=True)
	ARBID = models.CharField(db_column='ARBID',max_length=8,null=True)
	LTXA1 = models.CharField(db_column='LTXA1',max_length=40,null=True)
	IEDD = models.DateField(db_column='IEDD',null=True)
	ZEIWM = models.CharField(db_column='ZEIWM',max_length=3,null=True)
	ZEIWN = models.CharField(db_column='ZEIWN',max_length=3,null=True)
	FSAVD = models.DateField(db_column='FSAVD',null=True)
	FSEVD = models.DateField(db_column='FSEVD',null=True)
	FSSAD = models.DateField(db_column='FSSAD',null=True)
	DAUMI = models.DecimalField(db_column='DAUMI',max_digits=5,decimal_places=3,null=True)
	ZWMIN = models.DecimalField(db_column='ZWMIN',max_digits=9,decimal_places=3,null=True)
	BEAZE = models.CharField(db_column='BEAZE',max_length=3,null=True)
	RASCH = models.CharField(db_column='RASCH',max_length=2,null=True)
	DAUME = models.CharField(db_column='DAUME',max_length=3,null=True)
	SSSBD = models.DateField(db_column='SSSBD',null=True)
	SSEVZ = models.TimeField(db_column='SSEVZ',null=True)
	PRZNT = models.IntegerField(db_column='PRZNT',null=True)
	LMNGA = models.DecimalField(db_column='LMNGA',max_digits=13,decimal_places=3,null=True)
	SSSAZ = models.TimeField(db_column='SSSAZ',null=True)
	WAERS = models.CharField(db_column='WAERS',max_length=5,null=True)
	ARUZE = models.CharField(db_column='ARUZE',max_length=3,null=True)
	UEMUS = models.CharField(db_column='UEMUS',max_length=1,null=True)
	FSAVZ = models.TimeField(db_column='FSAVZ',null=True)
	VORNR = models.CharField(db_column='VORNR',max_length=4,null=False)
	FSEVZ = models.TimeField(db_column='FSEVZ',null=True)
	SSAVZ = models.TimeField(db_column='SSAVZ',null=True)
	FSSAZ = models.TimeField(db_column='FSSAZ',null=True)
	MINWE = models.DecimalField(db_column='MINWE',max_digits=13,decimal_places=3,null=True)
	RFSCH = models.CharField(db_column='RFSCH',max_length=10,null=True)
	BEARZ = models.FloatField(db_column='BEARZ',null=True)
	DAUNO = models.DecimalField(db_column='DAUNO',max_digits=5,decimal_places=3,null=True)
	UEKAN = models.CharField(db_column='UEKAN',max_length=1,null=True)
	RUEST = models.FloatField(db_column='RUEST',null=True)
	FSSBD = models.DateField(db_column='FSSBD',null=True)
	SSEVD = models.DateField(db_column='SSEVD',null=True)
	SSSAD = models.DateField(db_column='SSSAD',null=True)
	DAUNE = models.CharField(db_column='DAUNE',max_length=3,null=True)
	SSAVD = models.DateField(db_column='SSAVD',null=True)
	FSSBZ = models.TimeField(db_column='FSSBZ',null=True)

	class Meta:
		unique_together = (('CLIENT','WERKS','AUFNR','APLZL','VORNR','UVORN',),)


# Position: 10 ################ Table DESC: Production order processes ####################
class MPM_AFVOL(models.Model):
	XDISP = models.CharField(db_column='XDISP',max_length=1,null=True)
	ZLPRO = models.DecimalField(db_column='ZLPRO',max_digits=9,decimal_places=3,null=True)
	ANZZL = models.IntegerField(db_column='ANZZL',null=True)
	ISDD = models.DateField(db_column='ISDD',null=True)
	LIEGZ = models.FloatField(db_column='LIEGZ',null=True)
	BMSCH = models.DecimalField(db_column='BMSCH',max_digits=13,decimal_places=3,null=True)
	LAR04 = models.CharField(db_column='LAR04',max_length=6,null=True)
	LAR03 = models.CharField(db_column='LAR03',max_length=6,null=True)
	LAR06 = models.CharField(db_column='LAR06',max_length=6,null=True)
	LAR05 = models.CharField(db_column='LAR05',max_length=6,null=True)
	ABRUE = models.FloatField(db_column='ABRUE',null=True)
	SSSLD = models.DateField(db_column='SSSLD',null=True)
	NO_OF_CAP = models.IntegerField(db_column='NO_OF_CAP',null=False)
	VGWTS = models.CharField(db_column='VGWTS',max_length=4,null=True)
	STEUS = models.CharField(db_column='STEUS',max_length=4,null=True)
	FSSLD = models.DateField(db_column='FSSLD',null=True)
	PEINH = models.DecimalField(db_column='PEINH',max_digits=4,decimal_places=3,null=True)
	RMNGA = models.DecimalField(db_column='RMNGA',max_digits=13,decimal_places=3,null=True)
	TRAZE = models.CharField(db_column='TRAZE',max_length=3,null=True)
	ARBEH = models.CharField(db_column='ARBEH',max_length=3,null=True)
	ARBEI = models.DecimalField(db_column='ARBEI',max_digits=7,decimal_places=3,null=True)
	SSSBZ = models.TimeField(db_column='SSSBZ',null=True)
	RSTZE = models.CharField(db_column='RSTZE',max_length=3,null=True)
	WRTZE = models.CharField(db_column='WRTZE',max_length=3,null=True)
	FSSLZ = models.TimeField(db_column='FSSLZ',null=True)
	IEAVD = models.DateField(db_column='IEAVD',null=True)
	LIGZE = models.CharField(db_column='LIGZE',max_length=3,null=True)
	SPLIM = models.DecimalField(db_column='SPLIM',max_digits=5,decimal_places=3,null=True)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=False)
	ZWNOR = models.DecimalField(db_column='ZWNOR',max_digits=9,decimal_places=3,null=True)
	TRANZ = models.FloatField(db_column='TRANZ',null=True)
	APLZL = models.CharField(db_column='APLZL',max_length=8,null=False)
	PVZNR = models.CharField(db_column='PVZNR',max_length=4,null=True)
	PREIS = models.CharField(db_column='PREIS',max_length=13,null=True)
	ISDZ = models.TimeField(db_column='ISDZ',null=True)
	VGE05 = models.CharField(db_column='VGE05',max_length=3,null=True)
	VGE04 = models.CharField(db_column='VGE04',max_length=3,null=True)
	VGE06 = models.CharField(db_column='VGE06',max_length=3,null=True)
	VGE01 = models.CharField(db_column='VGE01',max_length=3,null=True)
	CY_SEQNRV = models.CharField(db_column='CY_SEQNRV',max_length=14,null=True)
	VGE03 = models.CharField(db_column='VGE03',max_length=3,null=True)
	VGE02 = models.CharField(db_column='VGE02',max_length=3,null=True)
	ZEITN = models.CharField(db_column='ZEITN',max_length=3,null=True)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	KALID = models.CharField(db_column='KALID',max_length=2,null=True)
	ISAVD = models.DateField(db_column='ISAVD',null=True)
	SKIP_RELEASE = models.CharField(db_column='SKIP_RELEASE',max_length=1,null=True)
	MGVRG = models.DecimalField(db_column='MGVRG',max_digits=13,decimal_places=3,null=True)
	XMNGA = models.DecimalField(db_column='XMNGA',max_digits=13,decimal_places=3,null=True)
	LAR02 = models.CharField(db_column='LAR02',max_length=6,null=True)
	LAR01 = models.CharField(db_column='LAR01',max_length=6,null=True)
	MEINH = models.CharField(db_column='MEINH',max_length=3,null=True)
	USE05 = models.CharField(db_column='USE05',max_length=3,null=True)
	SSSLZ = models.TimeField(db_column='SSSLZ',null=True)
	USE04 = models.CharField(db_column='USE04',max_length=3,null=True)
	SSEDZ = models.TimeField(db_column='SSEDZ',null=True)
	AUFAK = models.DecimalField(db_column='AUFAK',max_digits=7,decimal_places=3,null=True)
	ZEIMB = models.CharField(db_column='ZEIMB',max_length=3,null=True)
	SSELZ = models.TimeField(db_column='SSELZ',null=True)
	IEDZ = models.TimeField(db_column='IEDZ',null=True)
	FSELD = models.DateField(db_column='FSELD',null=True)
	VGW06 = models.DecimalField(db_column='VGW06',max_digits=9,decimal_places=3,null=True)
	VGW03 = models.DecimalField(db_column='VGW03',max_digits=9,decimal_places=3,null=True)
	VGW02 = models.DecimalField(db_column='VGW02',max_digits=9,decimal_places=3,null=True)
	VGW05 = models.DecimalField(db_column='VGW05',max_digits=9,decimal_places=3,null=True)
	ZEILP = models.CharField(db_column='ZEILP',max_length=3,null=True)
	VGW04 = models.DecimalField(db_column='VGW04',max_digits=9,decimal_places=3,null=True)
	FSEDD = models.DateField(db_column='FSEDD',null=True)
	SPMUS = models.CharField(db_column='SPMUS',max_length=1,null=True)
	ANZMA = models.DecimalField(db_column='ANZMA',max_digits=7,decimal_places=3,null=True)
	VGW01 = models.DecimalField(db_column='VGW01',max_digits=9,decimal_places=3,null=True)
	SSEDD = models.DateField(db_column='SSEDD',null=True)
	ZTMIN = models.DecimalField(db_column='ZTMIN',max_digits=9,decimal_places=3,null=True)
	SSELD = models.DateField(db_column='SSELD',null=True)
	ZMINU = models.DecimalField(db_column='ZMINU',max_digits=9,decimal_places=3,null=True)
	WARTZ = models.FloatField(db_column='WARTZ',null=True)
	FSELZ = models.TimeField(db_column='FSELZ',null=True)
	USR04 = models.DecimalField(db_column='USR04',max_digits=13,decimal_places=3,null=True)
	USR05 = models.DecimalField(db_column='USR05',max_digits=13,decimal_places=3,null=True)
	FSEDZ = models.TimeField(db_column='FSEDZ',null=True)
	ZEIMU = models.CharField(db_column='ZEIMU',max_length=3,null=True)
	ZMINB = models.DecimalField(db_column='ZMINB',max_digits=9,decimal_places=3,null=True)
	RFGRP = models.CharField(db_column='RFGRP',max_length=10,null=True)
	ARBID = models.CharField(db_column='ARBID',max_length=8,null=True)
	LTXA1 = models.CharField(db_column='LTXA1',max_length=40,null=True)
	IEDD = models.DateField(db_column='IEDD',null=True)
	ZEIWM = models.CharField(db_column='ZEIWM',max_length=3,null=True)
	ZEIWN = models.CharField(db_column='ZEIWN',max_length=3,null=True)
	FSAVD = models.DateField(db_column='FSAVD',null=True)
	ABLIPKZ = models.CharField(db_column='ABLIPKZ',max_length=1,null=True)
	FSEVD = models.DateField(db_column='FSEVD',null=True)
	FSSAD = models.DateField(db_column='FSSAD',null=True)
	DAUMI = models.DecimalField(db_column='DAUMI',max_digits=5,decimal_places=3,null=True)
	ZWMIN = models.DecimalField(db_column='ZWMIN',max_digits=9,decimal_places=3,null=True)
	BEAZE = models.CharField(db_column='BEAZE',max_length=3,null=True)
	RASCH = models.CharField(db_column='RASCH',max_length=2,null=True)
	DAUME = models.CharField(db_column='DAUME',max_length=3,null=True)
	SSSBD = models.DateField(db_column='SSSBD',null=True)
	FLIES = models.CharField(db_column='FLIES',max_length=1,null=True)
	SSEVZ = models.TimeField(db_column='SSEVZ',null=True)
	PRZNT = models.IntegerField(db_column='PRZNT',null=True)
	LMNGA = models.DecimalField(db_column='LMNGA',max_digits=13,decimal_places=3,null=True)
	SSSAZ = models.TimeField(db_column='SSSAZ',null=True)
	WAERS = models.CharField(db_column='WAERS',max_length=5,null=True)
	ARUZE = models.CharField(db_column='ARUZE',max_length=3,null=True)
	UEMUS = models.CharField(db_column='UEMUS',max_length=1,null=True)
	FSAVZ = models.TimeField(db_column='FSAVZ',null=True)
	VORNR = models.CharField(db_column='VORNR',max_length=4,null=False)
	FSEVZ = models.TimeField(db_column='FSEVZ',null=True)
	SSAVZ = models.TimeField(db_column='SSAVZ',null=True)
	FSSAZ = models.TimeField(db_column='FSSAZ',null=True)
	MINWE = models.DecimalField(db_column='MINWE',max_digits=13,decimal_places=3,null=True)
	RFSCH = models.CharField(db_column='RFSCH',max_length=10,null=True)
	BEARZ = models.FloatField(db_column='BEARZ',null=True)
	DAUNO = models.DecimalField(db_column='DAUNO',max_digits=5,decimal_places=3,null=True)
	UEKAN = models.CharField(db_column='UEKAN',max_length=1,null=True)
	RUEST = models.FloatField(db_column='RUEST',null=True)
	FSSBD = models.DateField(db_column='FSSBD',null=True)
	SSEVD = models.DateField(db_column='SSEVD',null=True)
	SSSAD = models.DateField(db_column='SSSAD',null=True)
	DAUNE = models.CharField(db_column='DAUNE',max_length=3,null=True)
	SSAVD = models.DateField(db_column='SSAVD',null=True)
	FSSBZ = models.TimeField(db_column='FSSBZ',null=True)

	class Meta:
		unique_together = (('CLIENT','WERKS','AUFNR','APLZL','VORNR',),)


# Position: 11 ################ Table DESC: List of events aggregated for an interval ####################
class MPM_AGGR_EVENT_MAP(models.Model):
	AGGR_ID = models.CharField(db_column='AGGR_ID',max_length=12,null=False)
	EVENT_ID = models.CharField(db_column='EVENT_ID',max_length=12,null=False)

	class Meta:
		unique_together = (('AGGR_ID','EVENT_ID',),)


# Position: 12 ################ Table DESC: Maintain Plant Specific Application level modes ####################
class MPM_APP_MODES(models.Model):
	MODE_NAME = models.CharField(db_column='MODE_NAME',max_length=10,null=False)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	MODE_VALUE = models.CharField(db_column='MODE_VALUE',max_length=1,null=True)

	class Meta:
		unique_together = (('CLIENT','PLANT','MODE_NAME',),)


# Position: 13 ################ Table DESC: MPM_CA_UG_ASSGNMT ####################
class MPM_CA_UG_ASSGNMT(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	CA_USERGROUP_ID = models.CharField(db_column='CA_USERGROUP_ID',max_length=255,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','CA_USERGROUP_ID',),)


# Position: 14 ################ Table DESC: MPM_CFN ####################
class MPM_CFN(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 15 ################ Table DESC: MPM_CHANGE_LOG ####################
class MPM_CHANGE_LOG(models.Model):
	BO_TYPE = models.CharField(db_column='BO_TYPE',max_length=3,null=True)
	TABLE_REF_KEY = models.CharField(db_column='TABLE_REF_KEY',max_length=255,null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	TABLE_NAME = models.CharField(db_column='TABLE_NAME',max_length=20,null=True)
	COLUMN_NAME = models.CharField(db_column='COLUMN_NAME',max_length=20,null=True)
	USER_ID = models.CharField(db_column='USER_ID',max_length=255,null=True)
	COMMENTS = models.CharField(db_column='COMMENTS',max_length=255,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	NEW_VALUE = models.CharField(db_column='NEW_VALUE',max_length=255,null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	PREV_VALUE = models.CharField(db_column='PREV_VALUE',max_length=255,null=True)
	LOG_TIMESTAMP = models.DateTimeField(db_column='LOG_TIMESTAMP',null=True)
	LOG_ID = models.IntegerField(db_column='LOG_ID',null=False)
	ACTION_TYPE = models.CharField(db_column='ACTION_TYPE',max_length=1,null=True)

	class Meta:
		unique_together = (('LOG_ID',),)


# Position: 16 ################ Table DESC: Customization name ####################
class MPM_CUST_NM(models.Model):
	IS_MULTIVALUED = models.CharField(db_column='IS_MULTIVALUED',max_length=1,null=True)
	RELEVANT_NODE_TYPE = models.CharField(db_column='RELEVANT_NODE_TYPE',max_length=20,null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	IS_TIMEBASED = models.CharField(db_column='IS_TIMEBASED',max_length=1,null=True)
	IS_MAT_SPECIFIC = models.CharField(db_column='IS_MAT_SPECIFIC',max_length=1,null=True)
	CUST_GROUP = models.CharField(db_column='CUST_GROUP',max_length=1,null=True)
	CONTEXT = models.CharField(db_column='CONTEXT',max_length=20,null=True)
	RELEVANT_DIMENSION = models.CharField(db_column='RELEVANT_DIMENSION',max_length=6,null=True)
	CUST_NAME = models.CharField(db_column='CUST_NAME',max_length=20,null=False)
	IS_MANDATORY = models.CharField(db_column='IS_MANDATORY',max_length=1,null=True)

	class Meta:
		unique_together = (('CUST_NAME',),)


# Position: 17 ################ Table DESC: Customization name text ####################
class MPM_CUST_NMT(models.Model):
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CUST_NAME = models.CharField(db_column='CUST_NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CUST_NAME','LANG',),)


# Position: 18 ################ Table DESC: Customization name allowed value text ####################
class MPM_CUST_NM_ALVALT(models.Model):
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	ALLOWED_VALUE = models.CharField(db_column='ALLOWED_VALUE',max_length=60,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CUST_NAME = models.CharField(db_column='CUST_NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CUST_NAME','ALLOWED_VALUE','LANG',),)


# Position: 19 ################ Table DESC: Customization name allowed value ####################
class MPM_CUST_NM_AL_VAL(models.Model):
	ALLOWED_VALUE = models.CharField(db_column='ALLOWED_VALUE',max_length=60,null=False)
	CUST_NAME = models.CharField(db_column='CUST_NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CUST_NAME','ALLOWED_VALUE',),)


# Position: 20 ################ Table DESC: Customization name value ####################
class MPM_CUST_NM_VAL(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	MATERIAL_NO = models.CharField(db_column='MATERIAL_NO',max_length=40,null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	CUST_VAL_ID = models.IntegerField(db_column='CUST_VAL_ID',null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=10,null=True)
	CUST_NAME = models.CharField(db_column='CUST_NAME',max_length=20,null=True)

	class Meta:
		unique_together = (('CUST_VAL_ID',),)


# Position: 21 ################ Table DESC: Customization value detail ####################
class MPM_CUST_NM_VALDET(models.Model):
	CUST_VAL_DETAIL_ID = models.IntegerField(db_column='CUST_VAL_DETAIL_ID',null=False)
	CUST_VALUE = models.CharField(db_column='CUST_VALUE',max_length=60,null=True)
	UOM = models.CharField(db_column='UOM',max_length=3,null=True)
	CUST_VAL_ID = models.IntegerField(db_column='CUST_VAL_ID',null=True)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=True)

	class Meta:
		unique_together = (('CUST_VAL_DETAIL_ID',),)


# Position: 22 ################ Table DESC: OEE Classifications ####################
class MPM_C_CLFN(models.Model):
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','NAME',),)


# Position: 23 ################ Table DESC: OEE Classifications Text ####################
class MPM_C_CLFNT(models.Model):
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','NAME','LANG',),)


# Position: 24 ################ Table DESC: Data Collection Element ####################
class MPM_C_DCELEM(models.Model):
	CAN_BE_ORD_IND = models.CharField(db_column='CAN_BE_ORD_IND',max_length=1,null=True)
	TIME_ELEMENT = models.CharField(db_column='TIME_ELEMENT',max_length=20,null=True)
	SRC_OF_PLAN = models.CharField(db_column='SRC_OF_PLAN',max_length=1,null=True)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=False)
	DC_ELEM_TYPE = models.CharField(db_column='DC_ELEM_TYPE',max_length=1,null=True)
	QTY_DIMENSION = models.CharField(db_column='QTY_DIMENSION',max_length=6,null=True)
	CONTEXT = models.CharField(db_column='CONTEXT',max_length=10,null=True)
	REPORTING_UOM = models.CharField(db_column='REPORTING_UOM',max_length=3,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','DC_ELEMENT',),)


# Position: 25 ################ Table DESC: Data Collection Element Texts ####################
class MPM_C_DCELEMT(models.Model):
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','LANG','DC_ELEMENT',),)


# Position: 26 ################ Table DESC: Data collection element context ####################
class MPM_C_DCE_CTXT(models.Model):
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	RECORD_TYPE = models.CharField(db_column='RECORD_TYPE',max_length=1,null=True)
	CONTEXT = models.CharField(db_column='CONTEXT',max_length=10,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','CONTEXT',),)


# Position: 27 ################ Table DESC: Data collection element context Text ####################
class MPM_C_DCE_CTXTT(models.Model):
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CONTEXT = models.CharField(db_column='CONTEXT',max_length=10,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','LANG','CONTEXT',),)


# Position: 28 ################ Table DESC: Production Mode ####################
class MPM_C_PRDMODE(models.Model):
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	PROD_MODE = models.CharField(db_column='PROD_MODE',max_length=10,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PROD_MODE',),)


# Position: 29 ################ Table DESC: Production Mode Associated Order Type ####################
class MPM_C_PRDMODEOT(models.Model):
	ORDER_TYPE = models.CharField(db_column='ORDER_TYPE',max_length=4,null=False)
	PROD_MODE = models.CharField(db_column='PROD_MODE',max_length=10,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PROD_MODE','ORDER_TYPE',),)


# Position: 30 ################ Table DESC: Production Mode Texts ####################
class MPM_C_PRDMODET(models.Model):
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=False)
	PROD_MODE = models.CharField(db_column='PROD_MODE',max_length=10,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','LANG','PROD_MODE',),)


# Position: 31 ################ Table DESC: Time element type ####################
class MPM_C_TE_TYPE(models.Model):
	TIMEELEM_TYPE = models.CharField(db_column='TIMEELEM_TYPE',max_length=10,null=False)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	IS_CALCULATED = models.CharField(db_column='IS_CALCULATED',max_length=1,null=True)
	CATEGORY = models.CharField(db_column='CATEGORY',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','TIMEELEM_TYPE',),)


# Position: 32 ################ Table DESC: Time element type text ####################
class MPM_C_TE_TYPET(models.Model):
	TIMEELEM_TYPE = models.CharField(db_column='TIMEELEM_TYPE',max_length=10,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','LANG','TIMEELEM_TYPE',),)


# Position: 33 ################ Table DESC: Data and Associated Event mapping ####################
class MPM_DATA_AS_MC_EVT(models.Model):
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=True)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=True)
	EVENT_TYPE = models.CharField(db_column='EVENT_TYPE',max_length=10,null=True)
	EFFEC_DURATION = models.BigIntegerField(db_column='EFFEC_DURATION',null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=36,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	ASSOC_RC_ID = models.CharField(db_column='ASSOC_RC_ID',max_length=12,null=False)
	ENTRY_ID = models.CharField(db_column='ENTRY_ID',max_length=12,null=True)
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=True)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=True)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=True)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=True)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=True)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=True)
	HANA_SEND_TIME = models.DateTimeField(db_column='HANA_SEND_TIME',null=True)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=True)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=True)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=True)

	class Meta:
		unique_together = (('ASSOC_RC_ID',),)


# Position: 34 ################ Table DESC: Production Data to Event Mapping ####################
class MPM_DATA_EVENT_MAP(models.Model):
	DOWNTIME_CLOSED = models.CharField(db_column='DOWNTIME_CLOSED',max_length=1,null=True)
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	EVENT_EFFECT = models.CharField(db_column='EVENT_EFFECT',max_length=1,null=True)
	ENTRY_ID = models.CharField(db_column='ENTRY_ID',max_length=12,null=False)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	EVENT_ID = models.CharField(db_column='EVENT_ID',max_length=12,null=False)
	IS_BOTTLENECK = models.CharField(db_column='IS_BOTTLENECK',max_length=1,null=True)
	RUN_ID = models.CharField(db_column='RUN_ID',max_length=12,null=False)

	class Meta:
		unique_together = (('ENTRY_ID','EVENT_ID',),)


# Position: 35 ################ Table DESC: None ####################
class MPM_DATA_NODE_MAP(models.Model):
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=True)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=True)
	COMMENTS = models.CharField(db_column='COMMENTS',max_length=250,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	ENTRY_ID = models.CharField(db_column='ENTRY_ID',max_length=12,null=False)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=True)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=True)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=True)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=True)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=True)
	ATTACH_ID = models.CharField(db_column='ATTACH_ID',max_length=12,null=False)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=True)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=True)

	class Meta:
		unique_together = (('ATTACH_ID',),)


# Position: 36 ################ Table DESC: Production Run Data Collection ####################
class MPM_DATA_RC_ASSOC(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 37 ################ Table DESC: Dimensions ####################
class MPM_DIMENSION(models.Model):
	LENG = models.IntegerField(db_column='LENG',null=True)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	DIMID = models.CharField(db_column='DIMID',max_length=6,null=False)
	TEMPER = models.IntegerField(db_column='TEMPER',null=True)
	MASS = models.IntegerField(db_column='MASS',null=True)
	LIGHT = models.IntegerField(db_column='LIGHT',null=True)
	TIMEX = models.IntegerField(db_column='TIMEX',null=True)
	ECURR = models.IntegerField(db_column='ECURR',null=True)
	MOLQU = models.IntegerField(db_column='MOLQU',null=True)
	MSSIE = models.CharField(db_column='MSSIE',max_length=3,null=True)
	TEMP_DEP = models.CharField(db_column='TEMP_DEP',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','DIMID',),)


# Position: 38 ################ Table DESC: Dimension Texts ####################
class MPM_DIMENSIONT(models.Model):
	SPRAS = models.CharField(db_column='SPRAS',max_length=1,null=False)
	DIMID = models.CharField(db_column='DIMID',max_length=6,null=False)
	TXDIM = models.CharField(db_column='TXDIM',max_length=20,null=True)
	LAISO = models.CharField(db_column='LAISO',max_length=2,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','SPRAS','DIMID',),)


# Position: 39 ################ Table DESC: Event to Event map - For attaching events to other events ####################
class MPM_EVENT_MAP(models.Model):
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	EVENT_EFFECT = models.CharField(db_column='EVENT_EFFECT',max_length=1,null=True)
	PARENT_EVENT_ID = models.CharField(db_column='PARENT_EVENT_ID',max_length=12,null=False)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	CHILD_EVENT_ID = models.CharField(db_column='CHILD_EVENT_ID',max_length=12,null=False)

	class Meta:
		unique_together = (('PARENT_EVENT_ID','CHILD_EVENT_ID',),)


# Position: 40 ################ Table DESC: Event to node mapping ####################
class MPM_EVENT_NODE_MAP(models.Model):
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=True)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=True)
	COMMENTS = models.CharField(db_column='COMMENTS',max_length=250,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=True)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=True)
	EVENT_ID = models.CharField(db_column='EVENT_ID',max_length=12,null=False)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=True)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=True)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=True)
	ATTACH_ID = models.CharField(db_column='ATTACH_ID',max_length=12,null=False)
	DURATION = models.BigIntegerField(db_column='DURATION',null=True)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=True)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=True)

	class Meta:
		unique_together = (('ATTACH_ID',),)


# Position: 41 ################ Table DESC: MPM_EVNT_NOTIF_MAP ####################
class MPM_EVNT_NOTIF_MAP(models.Model):
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	OEE_NOTIF_ID = models.CharField(db_column='OEE_NOTIF_ID',max_length=12,null=False)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	EVENT_ID = models.CharField(db_column='EVENT_ID',max_length=12,null=False)

	class Meta:
		unique_together = (('OEE_NOTIF_ID','EVENT_ID',),)


# Position: 42 ################ Table DESC: MPM_EXTENSIONS ####################
class MPM_EXTENSIONS(models.Model):
	EXTENSION_NAME = models.CharField(db_column='EXTENSION_NAME',max_length=255,null=True)
	EXTENSION_ID = models.BigIntegerField(db_column='EXTENSION_ID',null=False)
	PLANT = models.CharField(db_column='PLANT',max_length=50,null=False)
	ASYC = models.CharField(db_column='ASYC',max_length=1,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	ACTIVITY_ID = models.CharField(db_column='ACTIVITY_ID',max_length=20,null=False)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=50,null=False)
	METHOD_ID = models.BigIntegerField(db_column='METHOD_ID',null=False)
	EXTENSION_TYPE = models.IntegerField(db_column='EXTENSION_TYPE',null=False)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	ENABLED = models.CharField(db_column='ENABLED',max_length=1,null=False)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)
	SEQ = models.BigIntegerField(db_column='SEQ',null=False)

	class Meta:
		unique_together = (('EXTENSION_ID',),)


# Position: 43 ################ Table DESC: MPM_EXT_DESC ####################
class MPM_EXT_DESC(models.Model):
	EXTENSION_ID = models.BigIntegerField(db_column='EXTENSION_ID',null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	DESCRIPTION_ID = models.BigIntegerField(db_column='DESCRIPTION_ID',null=False)

	class Meta:
		unique_together = (('DESCRIPTION_ID',),)


# Position: 44 ################ Table DESC: MPM_EXT_FILTER ####################
class MPM_EXT_FILTER(models.Model):
	EXTENSION_ID = models.BigIntegerField(db_column='EXTENSION_ID',null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=False)
	FILTER_NAME = models.CharField(db_column='FILTER_NAME',max_length=100,null=False)
	FILTER_ID = models.BigIntegerField(db_column='FILTER_ID',null=False)

	class Meta:
		unique_together = (('FILTER_ID',),)


# Position: 45 ################ Table DESC: MPM_EXT_FILTER_DSC ####################
class MPM_EXT_FILTER_DSC(models.Model):
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=False)
	FILTER_ID = models.BigIntegerField(db_column='FILTER_ID',null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	DESCRIPTION_ID = models.BigIntegerField(db_column='DESCRIPTION_ID',null=False)

	class Meta:
		unique_together = (('DESCRIPTION_ID',),)


# Position: 46 ################ Table DESC: MPM_EXT_FILTER_OPT ####################
class MPM_EXT_FILTER_OPT(models.Model):
	FIELD_VALUE = models.CharField(db_column='FIELD_VALUE',max_length=100,null=False)
	FILTER_OPTION_ID = models.BigIntegerField(db_column='FILTER_OPTION_ID',null=False)
	FIELD_NAME = models.CharField(db_column='FIELD_NAME',max_length=100,null=False)
	FILTER_ID = models.BigIntegerField(db_column='FILTER_ID',null=False)

	class Meta:
		unique_together = (('FILTER_OPTION_ID',),)


# Position: 47 ################ Table DESC: Factory Calendar ####################
class MPM_FACTCAL(models.Model):
	CAL_ID = models.CharField(db_column='CAL_ID',max_length=2,null=False)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	MON10 = models.CharField(db_column='MON10',max_length=31,null=True)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	MON02 = models.CharField(db_column='MON02',max_length=31,null=True)
	MON03 = models.CharField(db_column='MON03',max_length=31,null=True)
	MON11 = models.CharField(db_column='MON11',max_length=31,null=True)
	MON01 = models.CharField(db_column='MON01',max_length=31,null=True)
	MON12 = models.CharField(db_column='MON12',max_length=31,null=True)
	MON06 = models.CharField(db_column='MON06',max_length=31,null=True)
	MON07 = models.CharField(db_column='MON07',max_length=31,null=True)
	MON04 = models.CharField(db_column='MON04',max_length=31,null=True)
	MON05 = models.CharField(db_column='MON05',max_length=31,null=True)
	CAL_YEAR = models.CharField(db_column='CAL_YEAR',max_length=4,null=False)
	MON08 = models.CharField(db_column='MON08',max_length=31,null=True)
	MON09 = models.CharField(db_column='MON09',max_length=31,null=True)

	class Meta:
		unique_together = (('CAL_ID','CAL_YEAR',),)


# Position: 48 ################ Table DESC: Files ####################
class MPM_FILES(models.Model):
	CREATED_DATE_TIME = models.DateTimeField(db_column='CREATED_DATE_TIME',null=True)
	TYP = models.CharField(db_column='TYP',max_length=128,null=False)
	ID = models.CharField(db_column='ID',max_length=128,null=False)
	CONTENT = models.BinaryField(db_column='CONTENT',null=True)
	MODIFIED_DATE_TIME = models.DateTimeField(db_column='MODIFIED_DATE_TIME',null=True)

	class Meta:
		unique_together = (('ID','TYP',),)


# Position: 49 ################ Table DESC: Formula Parameters ####################
class MPM_FORMULA_PARAM(models.Model):
	VTERM = models.CharField(db_column='VTERM',max_length=1,null=True)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	UNIT = models.CharField(db_column='UNIT',max_length=3,null=True)
	VKAPA = models.CharField(db_column='VKAPA',max_length=1,null=True)
	FLDPL = models.CharField(db_column='FLDPL',max_length=21,null=True)
	FLDFA = models.CharField(db_column='FLDFA',max_length=21,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	VALUE_DEF = models.DecimalField(db_column='VALUE_DEF',max_digits=9,decimal_places=3,null=True)
	VGFLD = models.CharField(db_column='VGFLD',max_length=10,null=True)
	DIMEN = models.CharField(db_column='DIMEN',max_length=6,null=True)
	VKALK = models.CharField(db_column='VKALK',max_length=1,null=True)
	PARID = models.CharField(db_column='PARID',max_length=6,null=False)
	VKAPF = models.CharField(db_column='VKAPF',max_length=1,null=True)
	VRWRT = models.CharField(db_column='VRWRT',max_length=1,null=True)

	class Meta:
		unique_together = (('CLIENT','PARID',),)


# Position: 50 ################ Table DESC: Formula Parameters Text ####################
class MPM_FORMULA_PARAMT(models.Model):
	SPRAS = models.CharField(db_column='SPRAS',max_length=2,null=False)
	DESC_SHORT = models.CharField(db_column='DESC_SHORT',max_length=11,null=True)
	PARID = models.CharField(db_column='PARID',max_length=6,null=False)
	DESC_LONG = models.CharField(db_column='DESC_LONG',max_length=30,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','SPRAS','PARID',),)


# Position: 51 ################ Table DESC: Global Configurations ####################
class MPM_GLOBAL_CONFIG(models.Model):
	VAL = models.CharField(db_column='VAL',max_length=1024,null=True)
	NAME = models.CharField(db_column='NAME',max_length=128,null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 52 ################ Table DESC: Goods Movement Data Collection ####################
class MPM_GOODS_MVT_DATA(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	HU_TYPE = models.CharField(db_column='HU_TYPE',max_length=1,null=True)
	POSTING_ID = models.CharField(db_column='POSTING_ID',max_length=12,null=False)
	RSART = models.CharField(db_column='RSART',max_length=1,null=True)
	MOVEMENT_TYPE = models.CharField(db_column='MOVEMENT_TYPE',max_length=3,null=True)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=True)
	ROUTING_OPER_NO = models.CharField(db_column='ROUTING_OPER_NO',max_length=4,null=True)
	POSTING_DATE = models.DateTimeField(db_column='POSTING_DATE',null=True)
	STATUS = models.CharField(db_column='STATUS',max_length=3,null=True)
	BASE_UOM = models.CharField(db_column='BASE_UOM',max_length=3,null=True)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=True)
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	DOCUMENT_NO = models.CharField(db_column='DOCUMENT_NO',max_length=35,null=True)
	ASOC_RC_ID = models.CharField(db_column='ASOC_RC_ID',max_length=12,null=True)
	DOCUMENT_YEAR = models.CharField(db_column='DOCUMENT_YEAR',max_length=4,null=True)
	BATCH_NO = models.CharField(db_column='BATCH_NO',max_length=10,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=True)
	HU_NO = models.CharField(db_column='HU_NO',max_length=20,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	RSNUM = models.CharField(db_column='RSNUM',max_length=10,null=True)
	QTY_IN_REPORT_UOM = models.DecimalField(db_column='QTY_IN_REPORT_UOM',max_digits=13,decimal_places=3,null=True)
	QTY_IN_BASE_UOM = models.DecimalField(db_column='QTY_IN_BASE_UOM',max_digits=13,decimal_places=3,null=True)
	SHELF_LIFE_DATE = models.DateTimeField(db_column='SHELF_LIFE_DATE',null=True)
	REPORT_UOM = models.CharField(db_column='REPORT_UOM',max_length=3,null=True)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	STORAGE_LOCATION = models.CharField(db_column='STORAGE_LOCATION',max_length=4,null=True)
	RSPOS = models.CharField(db_column='RSPOS',max_length=4,null=True)
	PRODUCTION_DATE = models.DateTimeField(db_column='PRODUCTION_DATE',null=True)
	PARENT_OPER_NO = models.CharField(db_column='PARENT_OPER_NO',max_length=4,null=True)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)

	class Meta:
		unique_together = (('POSTING_ID',),)


# Position: 53 ################ Table DESC: Goods Movement Posting Logs, map between MPM_GOODS_MVT_DATA and MPM_MESSAGE_QUEUE ####################
class MPM_GOODS_MVT_LOGS(models.Model):
	POSTING_ID = models.CharField(db_column='POSTING_ID',max_length=12,null=False)
	MESSAGE_ID = models.CharField(db_column='MESSAGE_ID',max_length=128,null=False)

	class Meta:
		unique_together = (('POSTING_ID','MESSAGE_ID',),)


# Position: 54 ################ Table DESC: Goods Movement Data for Reason Codes ####################
class MPM_GOODS_MVT_RC(models.Model):
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=True)
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=True)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=True)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=True)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=True)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=True)
	RC_ID = models.CharField(db_column='RC_ID',max_length=20,null=False)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=True)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=True)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=True)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=True)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=True)

	class Meta:
		unique_together = (('RC_ID',),)


# Position: 55 ################ Table DESC: MPM_HANA_AGG_QUEUE ####################
class MPM_HANA_AGG_QUEUE(models.Model):
	TIME_ID = models.CharField(db_column='TIME_ID',max_length=12,null=False)
	AGGREATION_TIME = models.DateTimeField(db_column='AGGREATION_TIME',null=False)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	RUN_ID = models.CharField(db_column='RUN_ID',max_length=12,null=True)
	IS_PROCESSED = models.CharField(db_column='IS_PROCESSED',max_length=1,null=False)

	class Meta:
		unique_together = (('TIME_ID',),)


# Position: 56 ################ Table DESC: MPM_INT_CAP_NODE ####################
class MPM_INT_CAP_NODE(models.Model):
	INT_CAP_ID = models.CharField(db_column='INT_CAP_ID',max_length=12,null=False)
	TIME_ID = models.CharField(db_column='TIME_ID',max_length=12,null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)

	class Meta:
		unique_together = (('INT_CAP_ID',),)


# Position: 57 ################ Table DESC: Events assigned to an Order ####################
class MPM_INT_EVENT_MAP(models.Model):
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	TIME_ID = models.CharField(db_column='TIME_ID',max_length=12,null=False)
	EVENT_ID = models.CharField(db_column='EVENT_ID',max_length=12,null=False)
	EFFEC_DURATION = models.BigIntegerField(db_column='EFFEC_DURATION',null=True)

	class Meta:
		unique_together = (('TIME_ID','EVENT_ID',),)


# Position: 58 ################ Table DESC: Production order status for header ####################
class MPM_JSTKL(models.Model):
	STAT = models.CharField(db_column='STAT',max_length=5,null=False)
	OBJNR = models.CharField(db_column='OBJNR',max_length=22,null=False)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=False)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	STSMA = models.CharField(db_column='STSMA',max_length=8,null=True)

	class Meta:
		unique_together = (('CLIENT','WERKS','AUFNR','OBJNR','STAT',),)


# Position: 59 ################ Table DESC: Production order status for subprocesses ####################
class MPM_JSTUL(models.Model):
	STAT = models.CharField(db_column='STAT',max_length=5,null=False)
	OBJNR = models.CharField(db_column='OBJNR',max_length=22,null=False)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=False)
	APLZL = models.CharField(db_column='APLZL',max_length=8,null=False)
	VORNR = models.CharField(db_column='VORNR',max_length=4,null=False)
	UVORN = models.CharField(db_column='UVORN',max_length=4,null=False)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	STSMA = models.CharField(db_column='STSMA',max_length=8,null=True)

	class Meta:
		unique_together = (('CLIENT','WERKS','AUFNR','APLZL','VORNR','UVORN','OBJNR','STAT',),)


# Position: 60 ################ Table DESC: Production order status for process ####################
class MPM_JSTVL(models.Model):
	STAT = models.CharField(db_column='STAT',max_length=5,null=False)
	OBJNR = models.CharField(db_column='OBJNR',max_length=22,null=False)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=False)
	APLZL = models.CharField(db_column='APLZL',max_length=8,null=False)
	VORNR = models.CharField(db_column='VORNR',max_length=4,null=False)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	STSMA = models.CharField(db_column='STSMA',max_length=8,null=True)

	class Meta:
		unique_together = (('CLIENT','WERKS','AUFNR','APLZL','VORNR','OBJNR','STAT',),)


# Position: 61 ################ Table DESC: Capacity requirements records for processes ####################
class MPM_KBEDL(models.Model):
	KBEASOLL = models.FloatField(db_column='KBEASOLL',null=True)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=False)
	CANUM = models.CharField(db_column='CANUM',max_length=4,null=False)
	KBEAREST = models.FloatField(db_column='KBEAREST',null=True)
	FSTAD = models.DateField(db_column='FSTAD',null=True)
	KABRREST = models.FloatField(db_column='KABRREST',null=True)
	SPLIT = models.IntegerField(db_column='SPLIT',null=False)
	BEDZL = models.CharField(db_column='BEDZL',max_length=8,null=False)
	BEDKZ = models.CharField(db_column='BEDKZ',max_length=1,null=True)
	KAPAR = models.CharField(db_column='KAPAR',max_length=3,null=True)
	FENDD = models.DateField(db_column='FENDD',null=True)
	APLZL = models.CharField(db_column='APLZL',max_length=8,null=False)
	FSTAU = models.TimeField(db_column='FSTAU',null=True)
	VORNR = models.CharField(db_column='VORNR',max_length=4,null=False)
	KRUESOLL = models.FloatField(db_column='KRUESOLL',null=True)
	KEINH = models.CharField(db_column='KEINH',max_length=3,null=True)
	KAPID = models.CharField(db_column='KAPID',max_length=8,null=True)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	MGVRG = models.DecimalField(db_column='MGVRG',max_digits=13,decimal_places=3,null=True)
	KABRSOLL = models.FloatField(db_column='KABRSOLL',null=True)
	MEINH = models.CharField(db_column='MEINH',max_length=3,null=False)
	FENDU = models.TimeField(db_column='FENDU',null=True)
	WORKCENTER_ID = models.CharField(db_column='WORKCENTER_ID',max_length=8,null=True)
	BEDID = models.CharField(db_column='BEDID',max_length=12,null=False)
	KRUEREST = models.FloatField(db_column='KRUEREST',null=True)

	class Meta:
		unique_together = (('CLIENT','WERKS','AUFNR','APLZL','VORNR','BEDID','BEDZL','CANUM',),)


# Position: 62 ################ Table DESC: Capacity requirements records for subprocesses ####################
class MPM_KBEUL(models.Model):
	KBEASOLL = models.FloatField(db_column='KBEASOLL',null=True)
	KRUESOLL = models.FloatField(db_column='KRUESOLL',null=True)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=False)
	CANUM = models.CharField(db_column='CANUM',max_length=4,null=False)
	KEINH = models.CharField(db_column='KEINH',max_length=3,null=True)
	KAPID = models.CharField(db_column='KAPID',max_length=8,null=True)
	KBEAREST = models.FloatField(db_column='KBEAREST',null=True)
	KABRREST = models.FloatField(db_column='KABRREST',null=True)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	BEDZL = models.CharField(db_column='BEDZL',max_length=8,null=False)
	BEDKZ = models.CharField(db_column='BEDKZ',max_length=1,null=True)
	KAPAR = models.CharField(db_column='KAPAR',max_length=3,null=True)
	KABRSOLL = models.FloatField(db_column='KABRSOLL',null=True)
	APLZL = models.CharField(db_column='APLZL',max_length=8,null=False)
	VORNR = models.CharField(db_column='VORNR',max_length=4,null=False)
	UVORN = models.CharField(db_column='UVORN',max_length=4,null=False)
	BEDID = models.CharField(db_column='BEDID',max_length=12,null=False)
	KRUEREST = models.FloatField(db_column='KRUEREST',null=True)

	class Meta:
		unique_together = (('CLIENT','WERKS','AUFNR','APLZL','VORNR','UVORN','BEDID','BEDZL','CANUM',),)


# Position: 63 ################ Table DESC: KPI ####################
class MPM_KPI(models.Model):
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	KPI = models.CharField(db_column='KPI',max_length=20,null=False)
	KPI_TYPE = models.CharField(db_column='KPI_TYPE',max_length=50,null=True)
	UOM_OF_TARGETS = models.CharField(db_column='UOM_OF_TARGETS',max_length=50,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','KPI',),)


# Position: 64 ################ Table DESC: KPI Texts ####################
class MPM_KPIT(models.Model):
	KPI = models.CharField(db_column='KPI',max_length=20,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','KPI','LANG',),)


# Position: 65 ################ Table DESC: Pod Layout ####################
class MPM_LAYOUT(models.Model):
	LAYOUT_ID = models.CharField(db_column='LAYOUT_ID',max_length=20,null=False)
	LAYOUT_IMAGE = models.CharField(db_column='LAYOUT_IMAGE',max_length=60,null=True)

	class Meta:
		unique_together = (('LAYOUT_ID',),)


# Position: 66 ################ Table DESC: Layout Panel ####################
class MPM_LAYOUT_PANEL(models.Model):
	PANEL_ID = models.CharField(db_column='PANEL_ID',max_length=20,null=False)
	LAYOUT_ID = models.CharField(db_column='LAYOUT_ID',max_length=20,null=False)

	class Meta:
		unique_together = (('LAYOUT_ID','PANEL_ID',),)


# Position: 67 ################ Table DESC: OEE_LSTCONF_UPDATE ####################
class MPM_LSTCONF_UPDATE(models.Model):
	CONFIG = models.CharField(db_column='CONFIG',max_length=20,null=False)
	LST_MODF_DATE_TIME = models.DateTimeField(db_column='LST_MODF_DATE_TIME',null=True)




# Position: 68 ################ Table DESC: Alternative Unit Of Measure for Material ####################
class MPM_MATMAS_ALT_UOM(models.Model):
	HOEHE = models.DecimalField(db_column='HOEHE',max_digits=13,decimal_places=3,null=True)
	BRGEW = models.DecimalField(db_column='BRGEW',max_digits=13,decimal_places=3,null=True)
	LAENG = models.DecimalField(db_column='LAENG',max_digits=13,decimal_places=3,null=True)
	BREIT = models.DecimalField(db_column='BREIT',max_digits=13,decimal_places=3,null=True)
	MEABM = models.CharField(db_column='MEABM',max_length=3,null=True)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	GTIN_VARIANT = models.CharField(db_column='GTIN_VARIANT',max_length=2,null=True)
	VOLUM = models.DecimalField(db_column='VOLUM',max_digits=13,decimal_places=3,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NUMTP = models.CharField(db_column='NUMTP',max_length=2,null=True)
	UMREN = models.DecimalField(db_column='UMREN',max_digits=5,decimal_places=3,null=True)
	GEWEI = models.CharField(db_column='GEWEI',max_length=3,null=True)
	MESUB = models.CharField(db_column='MESUB',max_length=3,null=True)
	MEINH = models.CharField(db_column='MEINH',max_length=3,null=False)
	VOLEH = models.CharField(db_column='VOLEH',max_length=3,null=True)
	EAN11 = models.CharField(db_column='EAN11',max_length=18,null=True)
	UMREZ = models.DecimalField(db_column='UMREZ',max_digits=5,decimal_places=3,null=True)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=False)

	class Meta:
		unique_together = (('CLIENT','MATNR','MEINH',),)


# Position: 69 ################ Table DESC: Material Header ####################
class MPM_MATMAS_HDR(models.Model):
	XCHPF = models.CharField(db_column='XCHPF',max_length=1,null=True)
	MTART = models.CharField(db_column='MTART',max_length=4,null=True)
	MATKL = models.CharField(db_column='MATKL',max_length=9,null=True)
	MEINS = models.CharField(db_column='MEINS',max_length=3,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=False)

	class Meta:
		unique_together = (('CLIENT','MATNR',),)


# Position: 70 ################ Table DESC: Material Short Text ####################
class MPM_MATMAS_HDRT(models.Model):
	SPRAS = models.CharField(db_column='SPRAS',max_length=1,null=False)
	MAKTX = models.CharField(db_column='MAKTX',max_length=40,null=False)
	SPRAS_ISO = models.CharField(db_column='SPRAS_ISO',max_length=2,null=True)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=False)

	class Meta:
		unique_together = (('CLIENT','MATNR','SPRAS',),)


# Position: 71 ################ Table DESC: Master material C segment ####################
class MPM_MATMAS_PLANT(models.Model):
	SERNP = models.CharField(db_column='SERNP',max_length=4,null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=6,null=False)
	XCHPF = models.CharField(db_column='XCHPF',max_length=1,null=True)
	SOBSL = models.CharField(db_column='SOBSL',max_length=2,null=True)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	RGEKZ = models.CharField(db_column='RGEKZ',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=False)

	class Meta:
		unique_together = (('CLIENT','MATNR','PLANT',),)


# Position: 72 ################ Table DESC: Master material warehouse/batch ####################
class MPM_MATMAS_STG_LOC(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=6,null=False)
	LBSTF = models.DecimalField(db_column='LBSTF',max_digits=13,decimal_places=3,null=True)
	HERKL = models.CharField(db_column='HERKL',max_length=3,null=True)
	LGORT = models.CharField(db_column='LGORT',max_length=4,null=False)
	LGPBE = models.CharField(db_column='LGPBE',max_length=10,null=True)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	PSTAT = models.CharField(db_column='PSTAT',max_length=15,null=True)
	LSOBS = models.CharField(db_column='LSOBS',max_length=2,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	LWMKB = models.CharField(db_column='LWMKB',max_length=3,null=True)
	LMINB = models.DecimalField(db_column='LMINB',max_digits=13,decimal_places=3,null=True)
	PRCTL = models.CharField(db_column='PRCTL',max_length=10,null=True)
	LVORM = models.CharField(db_column='LVORM',max_length=1,null=True)
	DISKZ = models.CharField(db_column='DISKZ',max_length=1,null=True)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=False)

	class Meta:
		unique_together = (('CLIENT','MATNR','PLANT','LGORT',),)


# Position: 73 ################ Table DESC: Machine Header ####################
class MPM_MC(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	WORKCENTER_TYPE = models.CharField(db_column='WORKCENTER_TYPE',max_length=2,null=True)
	WORKCENTER_ID = models.IntegerField(db_column='WORKCENTER_ID',null=True)
	CAPACITY_ID = models.IntegerField(db_column='CAPACITY_ID',null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NAME',),)


# Position: 74 ################ Table DESC: Machine Equipment Assignment ####################
class MPM_MCAEQUI(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	VALID_TO = models.DateField(db_column='VALID_TO',null=True)
	VALID_FROM = models.DateField(db_column='VALID_FROM',null=False)
	EQUI_ID = models.CharField(db_column='EQUI_ID',max_length=18,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NAME','VALID_FROM','EQUI_ID',),)


# Position: 75 ################ Table DESC: Machine Function Location Assignment ####################
class MPM_MCAFLOC(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	VALID_TO = models.DateField(db_column='VALID_TO',null=True)
	VALID_FROM = models.DateField(db_column='VALID_FROM',null=False)
	FLOC_ID = models.CharField(db_column='FLOC_ID',max_length=30,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NAME','VALID_FROM','FLOC_ID',),)


# Position: 76 ################ Table DESC: Machine Assigned Machine Groups ####################
class MPM_MCAMG(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	MACHINE_GROUP = models.CharField(db_column='MACHINE_GROUP',max_length=20,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NAME','MACHINE_GROUP',),)


# Position: 77 ################ Table DESC: Machine Group ####################
class MPM_MCGRP(models.Model):
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','NAME',),)


# Position: 78 ################ Table DESC: Machine Group Texts ####################
class MPM_MCGRPT(models.Model):
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','LANG','NAME',),)


# Position: 79 ################ Table DESC: Machine Header Text ####################
class MPM_MCT(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NAME','LANG',),)


# Position: 80 ################ Table DESC: Messages ####################
class MPM_MESSAGE(models.Model):
	MESSAGE = models.CharField(db_column='MESSAGE',max_length=1024,null=True)
	STATUS = models.CharField(db_column='STATUS',max_length=16,null=True)
	TYP = models.CharField(db_column='TYP',max_length=100,null=False)
	ID = models.CharField(db_column='ID',max_length=100,null=False)
	CONTENT = models.BinaryField(db_column='CONTENT',max_length=1024*1024,null=True)
	DATE_TIME = models.DateTimeField(db_column='DATE_TIME',null=True)

	class Meta:
		unique_together = (('ID','TYP',),)


# Position: 81 ################ Table DESC: Message Queue ####################
class MPM_MESSAGE_QUEUE(models.Model):
	RESFILE_CONTENT_ID = models.CharField(db_column='RESFILE_CONTENT_ID',max_length=512,null=True)
	PROC_TYPE = models.CharField(db_column='PROC_TYPE',max_length=16,null=True)
	IS_SYNC_PROC = models.IntegerField(db_column='IS_SYNC_PROC',null=True)
	NEXT_RUN_DATE_TIME = models.DateTimeField(db_column='NEXT_RUN_DATE_TIME',null=True)
	MODIFIED_DATE_TIME = models.DateTimeField(db_column='MODIFIED_DATE_TIME',null=True)
	PARENT_ID = models.CharField(db_column='PARENT_ID',max_length=128,null=True)
	MESSAGE = models.CharField(db_column='MESSAGE',max_length=1024,null=True)
	DOC_TYPE = models.CharField(db_column='DOC_TYPE',max_length=128,null=False)
	STATUS = models.CharField(db_column='STATUS',max_length=16,null=True)
	FILE_CONTENT_ID = models.CharField(db_column='FILE_CONTENT_ID',max_length=512,null=True)
	ATTEMPTS = models.IntegerField(db_column='ATTEMPTS',null=True)
	REQFILE_CONTENT_ID = models.CharField(db_column='REQFILE_CONTENT_ID',max_length=512,null=True)
	ID = models.CharField(db_column='ID',max_length=128,null=False)
	IDENTIFIER = models.CharField(db_column='IDENTIFIER',max_length=128,null=True)
	CORRELATION_KEY = models.CharField(db_column='CORRELATION_KEY',max_length=512,null=True)
	RETRY_LIMIT = models.IntegerField(db_column='RETRY_LIMIT',null=True)
	RECEIVED_DATE_TIME = models.DateTimeField(db_column='RECEIVED_DATE_TIME',null=True)

	class Meta:
		unique_together = (('ID','DOC_TYPE',),)


# Position: 82 ################ Table DESC: MPM_METHODS_DEF ####################
class MPM_METHODS_DEF(models.Model):
	METHOD_ID = models.BigIntegerField(db_column='METHOD_ID',null=False)
	SERVICE_ID = models.BigIntegerField(db_column='SERVICE_ID',null=False)
	METHOD_NAME = models.CharField(db_column='METHOD_NAME',max_length=255,null=False)
	DISPLAY_NAME = models.CharField(db_column='DISPLAY_NAME',max_length=255,null=True)

	class Meta:
		unique_together = (('METHOD_ID',),)


# Position: 83 ################ Table DESC: MPM_MPH_CFN ####################
class MPM_MPH_CFN(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	CLFN_VALUE = models.CharField(db_column='CLFN_VALUE',max_length=50,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','NAME',),)


# Position: 84 ################ Table DESC: MPM_MPH_CONVFAC ####################
class MPM_MPH_CONVFAC(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	TARGET_QUANTITY = models.DecimalField(db_column='TARGET_QUANTITY',max_digits=30,decimal_places=3,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	PROD_VER_ID = models.CharField(db_column='PROD_VER_ID',max_length=4,null=True)
	VALID_TO = models.DateField(db_column='VALID_TO',null=True)
	SOURCE_UOM = models.CharField(db_column='SOURCE_UOM',max_length=3,null=True)
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=False)
	SOURCE_QUANTITY = models.DecimalField(db_column='SOURCE_QUANTITY',max_digits=30,decimal_places=3,null=True)
	TARGET_UOM = models.CharField(db_column='TARGET_UOM',max_length=3,null=True)
	VALID_FROM = models.DateField(db_column='VALID_FROM',null=False)
	OEE_OPERATIONKEY = models.CharField(db_column='OEE_OPERATIONKEY',max_length=32,null=False)
	MATERIAL = models.CharField(db_column='MATERIAL',max_length=40,null=True)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','OEE_OPERATIONKEY','DC_ELEMENT','VALID_FROM',),)


# Position: 85 ################ Table DESC: Conversion Factor ####################
class MPM_MPH_CONVFACT(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	TARGET_QUANTITY = models.DecimalField(db_column='TARGET_QUANTITY',max_digits=30,decimal_places=3,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	PROD_VER_ID = models.CharField(db_column='PROD_VER_ID',max_length=4,null=True)
	VALID_TO = models.DateField(db_column='VALID_TO',null=True)
	SOURCE_UOM = models.CharField(db_column='SOURCE_UOM',max_length=3,null=True)
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=True)
	SOURCE_QUANTITY = models.DecimalField(db_column='SOURCE_QUANTITY',max_digits=30,decimal_places=3,null=True)
	TARGET_UOM = models.CharField(db_column='TARGET_UOM',max_length=3,null=True)
	VALID_FROM = models.DateField(db_column='VALID_FROM',null=False)
	OEE_OPERATIONKEY = models.CharField(db_column='OEE_OPERATIONKEY',max_length=32,null=False)
	MATERIAL = models.CharField(db_column='MATERIAL',max_length=40,null=True)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','OEE_OPERATIONKEY','VALID_FROM',),)


# Position: 86 ################ Table DESC: Plant Hierarchy Header ####################
class MPM_MPH_HDR(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	HIER_TEMPLATE = models.CharField(db_column='HIER_TEMPLATE',max_length=20,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	EVNT_ADJ_HORIZON = models.IntegerField(db_column='EVNT_ADJ_HORIZON',null=True)

	class Meta:
		unique_together = (('CLIENT','PLANT',),)


# Position: 87 ################ Table DESC: Plant Hierarchy Header Text ####################
class MPM_MPH_HDRT(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','LANG',),)


# Position: 88 ################ Table DESC: Plant Hierarchy KPI Target Details ####################
class MPM_MPH_KPITARG(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	KPI = models.CharField(db_column='KPI',max_length=20,null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	VALID_TO = models.DateField(db_column='VALID_TO',null=True)
	TARGET4 = models.DecimalField(db_column='TARGET4',max_digits=30,decimal_places=3,null=True)
	TARGET3 = models.DecimalField(db_column='TARGET3',max_digits=30,decimal_places=3,null=True)
	TARGET2 = models.DecimalField(db_column='TARGET2',max_digits=30,decimal_places=3,null=True)
	TARGET1 = models.DecimalField(db_column='TARGET1',max_digits=30,decimal_places=3,null=True)
	TARGET_UOM = models.CharField(db_column='TARGET_UOM',max_length=3,null=True)
	VALID_FROM = models.DateField(db_column='VALID_FROM',null=False)
	MATERIAL = models.CharField(db_column='MATERIAL',max_length=40,null=False)
	TARGET6 = models.DecimalField(db_column='TARGET6',max_digits=30,decimal_places=3,null=True)
	TARGET5 = models.DecimalField(db_column='TARGET5',max_digits=30,decimal_places=3,null=True)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','KPI','VALID_FROM','MATERIAL',),)


# Position: 89 ################ Table DESC: Plant Hierarchy Node Mark Parent Down ####################
class MPM_MPH_MRKDWN(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	ROUTING_TYPE = models.CharField(db_column='ROUTING_TYPE',max_length=1,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	ROUTING_OPER_KEY = models.CharField(db_column='ROUTING_OPER_KEY',max_length=8,null=True)
	PROD_VER_ID = models.CharField(db_column='PROD_VER_ID',max_length=4,null=True)
	ROUTING_OPER_NO = models.CharField(db_column='ROUTING_OPER_NO',max_length=4,null=True)
	VALID_TO = models.DateField(db_column='VALID_TO',null=True)
	ROUTING_GROUP = models.CharField(db_column='ROUTING_GROUP',max_length=150,null=True)
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=True)
	ROUTING_VERSION = models.CharField(db_column='ROUTING_VERSION',max_length=20,null=True)
	VALID_FROM = models.DateField(db_column='VALID_FROM',null=False)
	OEE_OPERATIONKEY = models.CharField(db_column='OEE_OPERATIONKEY',max_length=32,null=False)
	MATERIAL = models.CharField(db_column='MATERIAL',max_length=40,null=True)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','OEE_OPERATIONKEY','VALID_FROM',),)


# Position: 90 ################ Table DESC: Plant Hierarchy Nodes ####################
class MPM_MPH_NODE(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	LINE_NODE_ID = models.CharField(db_column='LINE_NODE_ID',max_length=32,null=True)
	NODE_TYPE = models.CharField(db_column='NODE_TYPE',max_length=20,null=True)
	USE_SHIFT_BREAKS = models.CharField(db_column='USE_SHIFT_BREAKS',max_length=1,null=True)
	VALID_TO = models.DateField(db_column='VALID_TO',null=True)
	MACHINE_NAME = models.CharField(db_column='MACHINE_NAME',max_length=20,null=True)
	STATUS = models.CharField(db_column='STATUS',max_length=1,null=True)
	SEQ_NO = models.CharField(db_column='SEQ_NO',max_length=5,null=True)
	TARGET_CLIENT = models.CharField(db_column='TARGET_CLIENT',max_length=3,null=True)
	VALID_FROM = models.DateField(db_column='VALID_FROM',null=True)
	TARGET_PLANT = models.CharField(db_column='TARGET_PLANT',max_length=4,null=True)
	IS_CAPACITY = models.CharField(db_column='IS_CAPACITY',max_length=1,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	CAPACITY_ID = models.CharField(db_column='CAPACITY_ID',max_length=8,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=True)
	TARGET_SYSTEM = models.CharField(db_column='TARGET_SYSTEM',max_length=10,null=True)
	PARENT_NODE_ID = models.CharField(db_column='PARENT_NODE_ID',max_length=32,null=False)
	STD_RATE_FLD = models.CharField(db_column='STD_RATE_FLD',max_length=30,null=True)
	WORKCENTER_TYPE = models.CharField(db_column='WORKCENTER_TYPE',max_length=2,null=True)
	USE_PREV_MAINT = models.CharField(db_column='USE_PREV_MAINT',max_length=1,null=True)
	WORKCENTER_ID = models.CharField(db_column='WORKCENTER_ID',max_length=8,null=True)
	REPORTS_PROD = models.CharField(db_column='REPORTS_PROD',max_length=1,null=True)
	AGG_GLOBAL = models.CharField(db_column='AGG_GLOBAL',max_length=1,null=True)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID',),)


# Position: 91 ################ Table DESC: Plant Hierarchy Node Assigned Machine Groups ####################
class MPM_MPH_NODEAMG(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	MACHINE_GROUP = models.CharField(db_column='MACHINE_GROUP',max_length=20,null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','MACHINE_GROUP',),)


# Position: 92 ################ Table DESC: Plant Hierarchy Node Assigned Technical Objects ####################
class MPM_MPH_NODEATO(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	VALID_TO = models.DateField(db_column='VALID_TO',null=True)
	TOBJ_ASSIGN_KEY = models.CharField(db_column='TOBJ_ASSIGN_KEY',max_length=32,null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	VALID_FROM = models.DateField(db_column='VALID_FROM',null=False)
	EQUI_ID = models.CharField(db_column='EQUI_ID',max_length=18,null=True)
	FLOC_ID = models.CharField(db_column='FLOC_ID',max_length=40,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','TOBJ_ASSIGN_KEY','VALID_FROM',),)


# Position: 93 ################ Table DESC: Plant Hierarchy Node Standard Rate ####################
class MPM_MPH_NODESTR(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	ROUTING_TYPE = models.CharField(db_column='ROUTING_TYPE',max_length=1,null=True)
	QUANTITY = models.DecimalField(db_column='QUANTITY',max_digits=30,decimal_places=3,null=True)
	QUANTITY_UOM = models.CharField(db_column='QUANTITY_UOM',max_length=3,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	DURATION_IN_SEC = models.IntegerField(db_column='DURATION_IN_SEC',null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	ROUTING_OPER_KEY = models.CharField(db_column='ROUTING_OPER_KEY',max_length=8,null=True)
	PROD_VER_ID = models.CharField(db_column='PROD_VER_ID',max_length=4,null=True)
	ROUTING_OPER_NO = models.CharField(db_column='ROUTING_OPER_NO',max_length=4,null=True)
	QTY_IN_BASE_UOM = models.DecimalField(db_column='QTY_IN_BASE_UOM',max_digits=30,decimal_places=3,null=True)
	VALID_TO = models.DateField(db_column='VALID_TO',null=True)
	ROUTING_GROUP = models.CharField(db_column='ROUTING_GROUP',max_length=150,null=True)
	ROUTING_VERSION = models.CharField(db_column='ROUTING_VERSION',max_length=20,null=True)
	BASE_UOM = models.CharField(db_column='BASE_UOM',max_length=3,null=True)
	VALID_FROM = models.DateField(db_column='VALID_FROM',null=False)
	DURATION_UOM = models.CharField(db_column='DURATION_UOM',max_length=3,null=True)
	OEE_OPERATIONKEY = models.CharField(db_column='OEE_OPERATIONKEY',max_length=32,null=False)
	MATERIAL = models.CharField(db_column='MATERIAL',max_length=40,null=True)
	DURATION = models.DecimalField(db_column='DURATION',max_digits=30,decimal_places=3,null=True)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','OEE_OPERATIONKEY','VALID_FROM',),)


# Position: 94 ################ Table DESC: Plant Hierarchy Node Text ####################
class MPM_MPH_NODET(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','LANG',),)


# Position: 95 ################ Table DESC: Plant Hierarchy Node Coordinates ####################
class MPM_NODE_COORDS(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	LONGITUDE = models.DecimalField(db_column='LONGITUDE',max_digits=13,decimal_places=3,null=False)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	ALTITUDE = models.DecimalField(db_column='ALTITUDE',max_digits=13,decimal_places=3,null=False)
	LATITUDE = models.DecimalField(db_column='LATITUDE',max_digits=13,decimal_places=3,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','LATITUDE','LONGITUDE','ALTITUDE',),)


# Position: 96 ################ Table DESC: MPM_PMNOTIFY_HDR ####################
class MPM_PMNOTIFY_HDR(models.Model):
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	END_TIMESTAMP = models.DateTimeField(db_column='END_TIMESTAMP',null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	NOTIFY_TYPE = models.CharField(db_column='NOTIFY_TYPE',max_length=2,null=True)
	NOTIFICATION_NO = models.CharField(db_column='NOTIFICATION_NO',max_length=12,null=True)
	COMMENTS = models.CharField(db_column='COMMENTS',max_length=40,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	ERP_SEND_TIME = models.DateTimeField(db_column='ERP_SEND_TIME',null=True)
	ERP_STATUS = models.CharField(db_column='ERP_STATUS',max_length=5,null=True)
	EQUI_ID = models.CharField(db_column='EQUI_ID',max_length=18,null=True)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	OEE_NOTIF_ID = models.CharField(db_column='OEE_NOTIF_ID',max_length=12,null=False)
	STATUS = models.CharField(db_column='STATUS',max_length=4,null=True)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	START_TIMESTAMP = models.DateTimeField(db_column='START_TIMESTAMP',null=True)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)
	FLOC_ID = models.CharField(db_column='FLOC_ID',max_length=40,null=True)
	BREAKDOWN = models.CharField(db_column='BREAKDOWN',max_length=1,null=True)

	class Meta:
		unique_together = (('OEE_NOTIF_ID',),)


# Position: 97 ################ Table DESC: POD header ####################
class MPM_POD(models.Model):
	IS_STANDARD_POD = models.CharField(db_column='IS_STANDARD_POD',max_length=1,null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	POD_TYPE = models.CharField(db_column='POD_TYPE',max_length=1,null=True)
	POD_ID = models.CharField(db_column='POD_ID',max_length=20,null=False)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	POD_IMAGE_URL = models.CharField(db_column='POD_IMAGE_URL',max_length=255,null=True)
	POD_LAYOUT = models.CharField(db_column='POD_LAYOUT',max_length=20,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','POD_ID',),)


# Position: 98 ################ Table DESC: Pod Button ####################
class MPM_POD_BTN(models.Model):
	LOCATION = models.CharField(db_column='LOCATION',max_length=1,null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	OPEN_AS = models.CharField(db_column='OPEN_AS',max_length=1,null=True)
	POD_ID = models.CharField(db_column='POD_ID',max_length=20,null=False)
	BTN_TYPE = models.CharField(db_column='BTN_TYPE',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	HOTKEY = models.CharField(db_column='HOTKEY',max_length=20,null=True)
	BTN_SIZE = models.IntegerField(db_column='BTN_SIZE',null=True)
	ACTIVITY_ASSIGNED = models.CharField(db_column='ACTIVITY_ASSIGNED',max_length=20,null=True)
	IMAGE_ICON = models.CharField(db_column='IMAGE_ICON',max_length=255,null=True)
	BTN_SEQUENCE = models.IntegerField(db_column='BTN_SEQUENCE',null=True)
	PARENT_BTN_ID = models.CharField(db_column='PARENT_BTN_ID',max_length=20,null=True)
	BTN_ID = models.CharField(db_column='BTN_ID',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','POD_ID','BTN_ID',),)


# Position: 99 ################ Table DESC: Pod Button Description ####################
class MPM_POD_BTN_DESC(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	POD_ID = models.CharField(db_column='POD_ID',max_length=20,null=False)
	BTN_ID = models.CharField(db_column='BTN_ID',max_length=20,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','POD_ID','BTN_ID','LANG',),)


# Position: 100 ################ Table DESC: POD Description ####################
class MPM_POD_DESC(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	POD_ID = models.CharField(db_column='POD_ID',max_length=20,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','POD_ID','LANG',),)


# Position: 101 ################ Table DESC: Pod Panel ####################
class MPM_POD_PANEL(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	POD_ID = models.CharField(db_column='POD_ID',max_length=20,null=False)
	PANEL_ID = models.CharField(db_column='PANEL_ID',max_length=20,null=False)
	LAYOUT_ID = models.CharField(db_column='LAYOUT_ID',max_length=20,null=False)
	ACTIVITY_ID = models.CharField(db_column='ACTIVITY_ID',max_length=20,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','POD_ID','LAYOUT_ID','PANEL_ID',),)


# Position: 102 ################ Table DESC: Pod Side Panel Buttons ####################
class MPM_POD_SIDEPNL_BT(models.Model):
	BTN_SIZE = models.IntegerField(db_column='BTN_SIZE',null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	ACTIVITY_ASSIGNED = models.CharField(db_column='ACTIVITY_ASSIGNED',max_length=20,null=True)
	IMAGE_ICON = models.CharField(db_column='IMAGE_ICON',max_length=255,null=True)
	BTN_SEQUENCE = models.IntegerField(db_column='BTN_SEQUENCE',null=True)
	POD_ID = models.CharField(db_column='POD_ID',max_length=20,null=False)
	BTN_ID = models.CharField(db_column='BTN_ID',max_length=20,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	SIDE_PANEL_ID = models.CharField(db_column='SIDE_PANEL_ID',max_length=20,null=False)
	HOTKEY = models.CharField(db_column='HOTKEY',max_length=20,null=True)

	class Meta:
		unique_together = (('CLIENT','PLANT','POD_ID','SIDE_PANEL_ID','BTN_ID',),)


# Position: 103 ################ Table DESC: Pod Side Panel ####################
class MPM_POD_SIDE_PANEL(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	SIDE_PANEL_TYPE = models.CharField(db_column='SIDE_PANEL_TYPE',max_length=1,null=True)
	POD_ID = models.CharField(db_column='POD_ID',max_length=20,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	SIDE_PANEL_ID = models.CharField(db_column='SIDE_PANEL_ID',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','POD_ID','SIDE_PANEL_ID',),)


# Position: 104 ################ Table DESC: Side Panel Button Description ####################
class MPM_POD_SPBTN_DESC(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	POD_ID = models.CharField(db_column='POD_ID',max_length=20,null=False)
	BTN_ID = models.CharField(db_column='BTN_ID',max_length=20,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	SIDE_PANEL_ID = models.CharField(db_column='SIDE_PANEL_ID',max_length=20,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','POD_ID','SIDE_PANEL_ID','BTN_ID','LANG',),)


# Position: 105 ################ Table DESC: MPM_POD_UG_ASGNMT2 ####################
class MPM_POD_UG_ASGNMT2(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	USER_GROUP_ID = models.CharField(db_column='USER_GROUP_ID',max_length=255,null=False)
	POD_ID = models.CharField(db_column='POD_ID',max_length=20,null=False)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','USER_GROUP_ID','POD_ID',),)


# Position: 106 ################ Table DESC: User Group and POD Assignment ####################
class MPM_POD_UG_ASSGNMT(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	USER_GROUP_ID = models.CharField(db_column='USER_GROUP_ID',max_length=255,null=False)
	POD_ID = models.CharField(db_column='POD_ID',max_length=255,null=False)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','NODE_ID','USER_GROUP_ID',),)


# Position: 107 ################ Table DESC: Plant Reason Code ####################
class MPM_PRC(models.Model):
	TARGET_IN_MIN = models.IntegerField(db_column='TARGET_IN_MIN',null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	TIMEELEM_TYPE = models.CharField(db_column='TIMEELEM_TYPE',max_length=10,null=True)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=True)
	QM_CATALOG_CODE = models.CharField(db_column='QM_CATALOG_CODE',max_length=4,null=True)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=True)
	RC_ID = models.IntegerField(db_column='RC_ID',null=False)
	IS_FIXED = models.CharField(db_column='IS_FIXED',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	GRUND = models.CharField(db_column='GRUND',max_length=4,null=True)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=True)
	SEQ_NO = models.CharField(db_column='SEQ_NO',max_length=5,null=True)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=True)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=True)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=True)
	QM_CATALOG = models.CharField(db_column='QM_CATALOG',max_length=1,null=True)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=True)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=True)
	QM_CATALOG_GRP = models.CharField(db_column='QM_CATALOG_GRP',max_length=8,null=True)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=True)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=True)

	class Meta:
		unique_together = (('RC_ID',),)


# Position: 108 ################ Table DESC: Plant Reason Code Text ####################
class MPM_PRCT(models.Model):
	RCT_ID = models.IntegerField(db_column='RCT_ID',null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	RC_ID = models.IntegerField(db_column='RC_ID',null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=True)

	class Meta:
		unique_together = (('RCT_ID',),)


# Position: 109 ################ Table DESC: Aggregated Events associated to an interval ####################
class MPM_PRDRUN_INT_EVT(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=True)
	AGGR_ID = models.CharField(db_column='AGGR_ID',max_length=12,null=False)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=True)
	EFFEC_DURATION = models.BigIntegerField(db_column='EFFEC_DURATION',null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	AFFECTAVAILABILITY = models.CharField(db_column='AFFECTAVAILABILITY',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	RUN_ID = models.CharField(db_column='RUN_ID',max_length=12,null=True)
	UOM = models.CharField(db_column='UOM',max_length=3,null=True)
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=True)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=True)
	TIME_ID = models.CharField(db_column='TIME_ID',max_length=12,null=False)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=True)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=True)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=True)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=True)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=True)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=True)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=True)

	class Meta:
		unique_together = (('AGGR_ID',),)


# Position: 110 ################ Table DESC: MPM_PRDRUN_MRKDWN ####################
class MPM_PRDRUN_MRKDWN(models.Model):
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=True)
	RUN_BTLNCK_ID = models.CharField(db_column='RUN_BTLNCK_ID',max_length=12,null=False)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	RUN_ID = models.CharField(db_column='RUN_ID',max_length=12,null=False)

	class Meta:
		unique_together = (('RUN_BTLNCK_ID',),)


# Position: 111 ################ Table DESC: Production Activity Text ####################
class MPM_PROD_ACTIVITY(models.Model):
	PROD_ACTIVITY = models.CharField(db_column='PROD_ACTIVITY',max_length=20,null=False)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	SAKL = models.CharField(db_column='SAKL',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PROD_ACTIVITY',),)


# Position: 112 ################ Table DESC: Production Activity Text ####################
class MPM_PROD_ACTIVITYT(models.Model):
	PROD_ACTIVITY = models.CharField(db_column='PROD_ACTIVITY',max_length=20,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PROD_ACTIVITY','LANG',),)


# Position: 113 ################ Table DESC: Production Events ####################
class MPM_PROD_EVENTS(models.Model):
	QUANTITY = models.FloatField(db_column='QUANTITY',null=True)
	START_DATE_UTC = models.DateField(db_column='START_DATE_UTC',null=True)
	EVENT_TYPE = models.CharField(db_column='EVENT_TYPE',max_length=10,null=True)
	NOTIFICATION_NO = models.CharField(db_column='NOTIFICATION_NO',max_length=12,null=True)
	END_DATE = models.DateField(db_column='END_DATE',null=True)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=True)
	ENTRY_TYPE = models.CharField(db_column='ENTRY_TYPE',max_length=1,null=True)
	MULTIPLIER = models.DecimalField(db_column='MULTIPLIER',max_digits=3,decimal_places=3,null=True)
	ACTS_AS_BOTTLENECK = models.CharField(db_column='ACTS_AS_BOTTLENECK',max_length=1,null=False)
	END_TIME = models.TimeField(db_column='END_TIME',null=True)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=True)
	BASE_UOM = models.CharField(db_column='BASE_UOM',max_length=3,null=True)
	HANA_SEND_TIME = models.DateTimeField(db_column='HANA_SEND_TIME',null=True)
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	END_TIMESTAMP = models.DateTimeField(db_column='END_TIMESTAMP',null=True)
	TO_MATNR = models.CharField(db_column='TO_MATNR',max_length=40,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	RUN_ID = models.CharField(db_column='RUN_ID',max_length=12,null=True)
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=True)
	STD_DUR_IN_SEC = models.BigIntegerField(db_column='STD_DUR_IN_SEC',null=True)
	EVENT_ID = models.CharField(db_column='EVENT_ID',max_length=12,null=False)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	START_TIME = models.TimeField(db_column='START_TIME',null=True)
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=True)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=True)
	START_TIME_UTC = models.TimeField(db_column='START_TIME_UTC',null=True)
	END_TIME_UTC = models.TimeField(db_column='END_TIME_UTC',null=True)
	COMMENTS = models.CharField(db_column='COMMENTS',max_length=250,null=True)
	ERP_SEND_TIME = models.DateTimeField(db_column='ERP_SEND_TIME',null=True)
	FREQUENCY = models.IntegerField(db_column='FREQUENCY',null=True)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=True)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=True)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=True)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=True)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=True)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=True)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=True)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=True)
	QTY_IN_STD_RT_UOM = models.DecimalField(db_column='QTY_IN_STD_RT_UOM',max_digits=13,decimal_places=3,null=True)
	EFFEC_DURATION = models.BigIntegerField(db_column='EFFEC_DURATION',null=True)
	START_DATE = models.DateField(db_column='START_DATE',null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	QTY_IN_BASE_UOM = models.DecimalField(db_column='QTY_IN_BASE_UOM',max_digits=13,decimal_places=3,null=True)
	CREW_SIZE = models.DecimalField(db_column='CREW_SIZE',max_digits=8,decimal_places=3,null=True)
	UOM = models.CharField(db_column='UOM',max_length=3,null=True)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	END_DATE_UTC = models.DateField(db_column='END_DATE_UTC',null=True)
	START_TIMESTAMP = models.DateTimeField(db_column='START_TIMESTAMP',null=True)

	class Meta:
		unique_together = (('EVENT_ID',),)


# Position: 114 ################ Table DESC: Production Run Data Collection ####################
class MPM_PROD_RUN_DATA(models.Model):
	QUANTITY = models.FloatField(db_column='QUANTITY',null=True)
	SERIAL_NO = models.CharField(db_column='SERIAL_NO',max_length=18,null=True)
	START_DATE_UTC = models.DateField(db_column='START_DATE_UTC',null=True)
	CONF_NUMBER = models.CharField(db_column='CONF_NUMBER',max_length=10,null=True)
	NOTIFICATION_NO = models.CharField(db_column='NOTIFICATION_NO',max_length=12,null=True)
	END_DATE = models.DateField(db_column='END_DATE',null=True)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=True)
	ENTRY_TYPE = models.CharField(db_column='ENTRY_TYPE',max_length=1,null=True)
	END_TIME = models.TimeField(db_column='END_TIME',null=True)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=True)
	BASE_UOM = models.CharField(db_column='BASE_UOM',max_length=3,null=True)
	QTY_REPORTED_BUOM = models.DecimalField(db_column='QTY_REPORTED_BUOM',max_digits=13,decimal_places=3,null=True)
	IS_APPROVED = models.CharField(db_column='IS_APPROVED',max_length=1,null=True)
	HANA_SEND_TIME = models.DateTimeField(db_column='HANA_SEND_TIME',null=True)
	RES_NUM = models.CharField(db_column='RES_NUM',max_length=10,null=True)
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	END_TIMESTAMP = models.DateTimeField(db_column='END_TIMESTAMP',null=True)
	EFFECTIVE_DURATION = models.DecimalField(db_column='EFFECTIVE_DURATION',max_digits=13,decimal_places=3,null=True)
	BATCH_NO = models.CharField(db_column='BATCH_NO',max_length=10,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	RUN_ID = models.CharField(db_column='RUN_ID',max_length=12,null=False)
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=True)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	START_TIME = models.TimeField(db_column='START_TIME',null=True)
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=True)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=True)
	START_TIME_UTC = models.TimeField(db_column='START_TIME_UTC',null=True)
	END_TIME_UTC = models.TimeField(db_column='END_TIME_UTC',null=True)
	COMMENTS = models.CharField(db_column='COMMENTS',max_length=250,null=True)
	ERP_SEND_TIME = models.DateTimeField(db_column='ERP_SEND_TIME',null=True)
	RES_POS = models.CharField(db_column='RES_POS',max_length=4,null=True)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=True)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=True)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=True)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=True)
	CONF_COUNTER = models.CharField(db_column='CONF_COUNTER',max_length=8,null=True)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=True)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=True)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=True)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=True)
	IMPACTS_LINE = models.CharField(db_column='IMPACTS_LINE',max_length=1,null=True)
	REPORTED_BUOM = models.CharField(db_column='REPORTED_BUOM',max_length=3,null=True)
	QTY_IN_STD_RT_UOM = models.DecimalField(db_column='QTY_IN_STD_RT_UOM',max_digits=13,decimal_places=3,null=True)
	EFFEC_DURATION = models.BigIntegerField(db_column='EFFEC_DURATION',null=True)
	START_DATE = models.DateField(db_column='START_DATE',null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	QTY_IN_BASE_UOM = models.DecimalField(db_column='QTY_IN_BASE_UOM',max_digits=13,decimal_places=3,null=True)
	UOM = models.CharField(db_column='UOM',max_length=3,null=True)
	ENTRY_ID = models.CharField(db_column='ENTRY_ID',max_length=12,null=False)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	END_DATE_UTC = models.DateField(db_column='END_DATE_UTC',null=True)
	START_TIMESTAMP = models.DateTimeField(db_column='START_TIMESTAMP',null=True)

	class Meta:
		unique_together = (('ENTRY_ID',),)


# Position: 115 ################ Table DESC: Production Run Downtime ####################
class MPM_PROD_RUN_DT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 116 ################ Table DESC: Production Run Header ####################
class MPM_PROD_RUN_HDR(models.Model):
	ROUTING_TYPE = models.CharField(db_column='ROUTING_TYPE',max_length=1,null=True)
	START_DATE_UTC = models.DateField(db_column='START_DATE_UTC',null=True)
	END_DATE = models.DateField(db_column='END_DATE',null=True)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=True)
	SPLIT_NUMBER = models.IntegerField(db_column='SPLIT_NUMBER',null=True)
	STD_RT_TIME_QTY = models.DecimalField(db_column='STD_RT_TIME_QTY',max_digits=16,decimal_places=3,null=True)
	ROUTING_OPER_NO = models.CharField(db_column='ROUTING_OPER_NO',max_length=4,null=True)
	REP_SHIFT_CAL_TIME = models.TimeField(db_column='REP_SHIFT_CAL_TIME',null=True)
	STATUS = models.CharField(db_column='STATUS',max_length=4,null=True)
	END_TIME = models.TimeField(db_column='END_TIME',null=True)
	HANA_SEND_TIME = models.DateTimeField(db_column='HANA_SEND_TIME',null=True)
	STD_RATE_QTY = models.DecimalField(db_column='STD_RATE_QTY',max_digits=16,decimal_places=3,null=True)
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	END_TIMESTAMP = models.DateTimeField(db_column='END_TIMESTAMP',null=True)
	PARENT_RUN_ID = models.CharField(db_column='PARENT_RUN_ID',max_length=12,null=True)
	REP_SHIFT_TIME = models.TimeField(db_column='REP_SHIFT_TIME',null=True)
	PAPLAN = models.CharField(db_column='PAPLAN',max_length=4,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	SCHGRUP = models.CharField(db_column='SCHGRUP',max_length=2,null=True)
	RUN_ID = models.CharField(db_column='RUN_ID',max_length=12,null=False)
	PROD_ACTIVITY = models.CharField(db_column='PROD_ACTIVITY',max_length=20,null=True)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)
	STD_RATE_UOM = models.CharField(db_column='STD_RATE_UOM',max_length=3,null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	START_TIME = models.TimeField(db_column='START_TIME',null=True)
	TARGET_QUANTITY = models.DecimalField(db_column='TARGET_QUANTITY',max_digits=16,decimal_places=3,null=True)
	START_TIME_UTC = models.TimeField(db_column='START_TIME_UTC',null=True)
	END_TIME_UTC = models.TimeField(db_column='END_TIME_UTC',null=True)
	REP_SHIFT_DATE = models.DateField(db_column='REP_SHIFT_DATE',null=True)
	RELEASED_HDR_ID = models.IntegerField(db_column='RELEASED_HDR_ID',null=False)
	RELEASED_ID = models.IntegerField(db_column='RELEASED_ID',null=False)
	REP_SHIFT_START = models.DateTimeField(db_column='REP_SHIFT_START',null=True)
	OEE_RELEVANT = models.CharField(db_column='OEE_RELEVANT',max_length=1,null=True)
	SEQ_NO = models.CharField(db_column='SEQ_NO',max_length=6,null=True)
	GROSS_DURATION = models.BigIntegerField(db_column='GROSS_DURATION',null=True)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=True)
	REP_SHIFT_END = models.DateTimeField(db_column='REP_SHIFT_END',null=True)
	PARENT_OPER_NO_PDO = models.CharField(db_column='PARENT_OPER_NO_PDO',max_length=4,null=True)
	STD_RT_TIME_UOM = models.CharField(db_column='STD_RT_TIME_UOM',max_length=3,null=True)
	START_DATE = models.DateField(db_column='START_DATE',null=True)
	TARGET_QTY_UOM = models.CharField(db_column='TARGET_QTY_UOM',max_length=3,null=True)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=True)
	STD_RT_TIME_IN_SEC = models.DecimalField(db_column='STD_RT_TIME_IN_SEC',max_digits=13,decimal_places=3,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	REPORTING_SHIFT_ID = models.CharField(db_column='REPORTING_SHIFT_ID',max_length=4,null=True)
	ROUTING_GROUP = models.CharField(db_column='ROUTING_GROUP',max_length=150,null=True)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	ROUTING_VERSION = models.CharField(db_column='ROUTING_VERSION',max_length=20,null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	END_DATE_UTC = models.DateField(db_column='END_DATE_UTC',null=True)
	PRODUCTION_MODE = models.CharField(db_column='PRODUCTION_MODE',max_length=10,null=True)
	START_TIMESTAMP = models.DateTimeField(db_column='START_TIMESTAMP',null=True)

	class Meta:
		unique_together = (('RUN_ID',),)


# Position: 117 ################ Table DESC: Production Run Intervals ####################
class MPM_PROD_RUN_INT(models.Model):
	END_TIMESTAMP = models.DateTimeField(db_column='END_TIMESTAMP',null=True)
	START_TIME = models.TimeField(db_column='START_TIME',null=True)
	END_DATE = models.DateField(db_column='END_DATE',null=True)
	START_DATE = models.DateField(db_column='START_DATE',null=True)
	EFFEC_DURATION = models.BigIntegerField(db_column='EFFEC_DURATION',null=True)
	ERP_SEND_TIME = models.DateTimeField(db_column='ERP_SEND_TIME',null=True)
	RUN_ID = models.CharField(db_column='RUN_ID',max_length=12,null=True)
	UNSCHEDULED_DOWN = models.BigIntegerField(db_column='UNSCHEDULED_DOWN',null=True)
	CREW_SIZE = models.DecimalField(db_column='CREW_SIZE',max_digits=8,decimal_places=3,null=True)
	PROD_ACTIVITY = models.CharField(db_column='PROD_ACTIVITY',max_length=20,null=True)
	END_TIME = models.TimeField(db_column='END_TIME',null=True)
	TIME_ID = models.CharField(db_column='TIME_ID',max_length=12,null=False)
	LOADING_TIME = models.BigIntegerField(db_column='LOADING_TIME',null=True)
	START_TIMESTAMP = models.DateTimeField(db_column='START_TIMESTAMP',null=True)
	DURATION = models.BigIntegerField(db_column='DURATION',null=True)

	class Meta:
		unique_together = (('TIME_ID',),)


# Position: 118 ################ Table DESC: OEE_PROFILE ####################
class MPM_PROFILE(models.Model):
	STEP_ID = models.IntegerField(db_column='STEP_ID',null=False)
	CREATED_DATE_TIME = models.DateTimeField(db_column='CREATED_DATE_TIME',null=True)
	MESSAGE_ID = models.CharField(db_column='MESSAGE_ID',max_length=128,null=False)
	PARENT = models.IntegerField(db_column='PARENT',null=True)
	DURATION = models.IntegerField(db_column='DURATION',null=False)

	class Meta:
		unique_together = (('MESSAGE_ID','STEP_ID','DURATION',),)


# Position: 119 ################ Table DESC: Message Queue ####################
class MPM_QUEUE(models.Model):
	RESFILE_CONTENT_ID = models.CharField(db_column='RESFILE_CONTENT_ID',max_length=512,null=True)
	TYP = models.CharField(db_column='TYP',max_length=128,null=False)
	SAVE_REQ_RES = models.CharField(db_column='SAVE_REQ_RES',max_length=5,null=True)
	PARENT_ID = models.CharField(db_column='PARENT_ID',max_length=512,null=True)
	MESSAGE = models.CharField(db_column='MESSAGE',max_length=1024,null=True)
	STATUS = models.CharField(db_column='STATUS',max_length=20,null=False)
	FILE_CONTENT_ID = models.CharField(db_column='FILE_CONTENT_ID',max_length=128,null=False)
	ATTEMPTS = models.IntegerField(db_column='ATTEMPTS',null=True)
	REQFILE_CONTENT_ID = models.CharField(db_column='REQFILE_CONTENT_ID',max_length=512,null=True)
	ID = models.CharField(db_column='ID',max_length=128,null=False)
	IDENTIFIER = models.CharField(db_column='IDENTIFIER',max_length=128,null=True)
	CORRELATION_KEY = models.CharField(db_column='CORRELATION_KEY',max_length=512,null=True)
	RETRY_LIMIT = models.IntegerField(db_column='RETRY_LIMIT',null=True)
	RECEIVED_DATE_TIME = models.DateTimeField(db_column='RECEIVED_DATE_TIME',null=True)

	class Meta:
		unique_together = (('ID','FILE_CONTENT_ID','TYP','STATUS',),)


# Position: 120 ################ Table DESC: Reason Code ####################
class MPM_RC(models.Model):
	TARGET_IN_MIN = models.IntegerField(db_column='TARGET_IN_MIN',null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	TIMEELEM_TYPE = models.CharField(db_column='TIMEELEM_TYPE',max_length=10,null=True)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=False)
	QM_CATALOG_CODE = models.CharField(db_column='QM_CATALOG_CODE',max_length=4,null=True)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=False)
	IS_FIXED = models.CharField(db_column='IS_FIXED',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	GRUND = models.CharField(db_column='GRUND',max_length=4,null=True)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=False)
	SEQ_NO = models.CharField(db_column='SEQ_NO',max_length=5,null=True)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=False)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=False)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=False)
	QM_CATALOG = models.CharField(db_column='QM_CATALOG',max_length=1,null=True)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=False)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=False)
	QM_CATALOG_GRP = models.CharField(db_column='QM_CATALOG_GRP',max_length=8,null=True)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=False)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','REASON_CODE1','REASON_CODE2','REASON_CODE3','REASON_CODE4','REASON_CODE5','REASON_CODE6','REASON_CODE7','REASON_CODE8','REASON_CODE9','REASON_CODE10',),)


# Position: 121 ################ Table DESC: Reason Code Text ####################
class MPM_RCT(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=False)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=False)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=False)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=False)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=False)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=False)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=False)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','LANG','REASON_CODE1','REASON_CODE2','REASON_CODE3','REASON_CODE4','REASON_CODE5','REASON_CODE6','REASON_CODE7','REASON_CODE8','REASON_CODE9','REASON_CODE10',),)


# Position: 122 ################ Table DESC: Reason Code Plant Hierarchy DC Element Association ####################
class MPM_RC_PH_DCELEM(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=True)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=True)
	RC_ID = models.IntegerField(db_column='RC_ID',null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	DC_ELEMENT = models.CharField(db_column='DC_ELEMENT',max_length=20,null=True)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=True)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=True)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=True)
	ID = models.IntegerField(db_column='ID',null=False)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=True)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=True)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=True)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 123 ################ Table DESC: MPM_RELEASED_DMD ####################
class MPM_RELEASED_DMD(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	PARENT_OPER_NO_PDO = models.CharField(db_column='PARENT_OPER_NO_PDO',max_length=4,null=True)
	START_TIME = models.TimeField(db_column='START_TIME',null=True)
	END_DATE = models.DateField(db_column='END_DATE',null=True)
	START_DATE = models.DateField(db_column='START_DATE',null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	ERP_SEND_TIME = models.DateTimeField(db_column='ERP_SEND_TIME',null=True)
	RELEASED_HDR_ID = models.IntegerField(db_column='RELEASED_HDR_ID',null=True)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	SPLIT_NUMBER = models.IntegerField(db_column='SPLIT_NUMBER',null=True)
	RELEASED_ID = models.IntegerField(db_column='RELEASED_ID',null=False)
	ROUTING_OPER_NO = models.CharField(db_column='ROUTING_OPER_NO',max_length=4,null=True)
	QTY_RELEASED = models.DecimalField(db_column='QTY_RELEASED',max_digits=13,decimal_places=3,null=True)
	STATUS = models.CharField(db_column='STATUS',max_length=4,null=True)
	END_TIME = models.TimeField(db_column='END_TIME',null=True)
	OEE_RELEVANT = models.CharField(db_column='OEE_RELEVANT',max_length=1,null=True)
	NO_OF_CAP = models.IntegerField(db_column='NO_OF_CAP',null=False)
	SEQ_NO = models.CharField(db_column='SEQ_NO',max_length=6,null=True)
	PARENT_OPER_NO = models.CharField(db_column='PARENT_OPER_NO',max_length=4,null=True)
	QTY_RELEASED_UOM = models.CharField(db_column='QTY_RELEASED_UOM',max_length=3,null=True)

	class Meta:
		unique_together = (('RELEASED_ID',),)


# Position: 124 ################ Table DESC: MPM_RELEAS_DMD_HDR ####################
class MPM_RELEAS_DMD_HDR(models.Model):
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	START_TIME = models.TimeField(db_column='START_TIME',null=True)
	END_DATE = models.DateField(db_column='END_DATE',null=True)
	START_DATE = models.DateField(db_column='START_DATE',null=True)
	ERP_SEND_TIME = models.DateTimeField(db_column='ERP_SEND_TIME',null=True)
	AUTYP = models.CharField(db_column='AUTYP',max_length=2,null=True)
	RELEASED_HDR_ID = models.IntegerField(db_column='RELEASED_HDR_ID',null=False)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=True)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	QTY_RELEASED = models.DecimalField(db_column='QTY_RELEASED',max_digits=13,decimal_places=3,null=True)
	STATUS = models.CharField(db_column='STATUS',max_length=4,null=True)
	END_TIME = models.TimeField(db_column='END_TIME',null=True)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	PRODUCTION_MODE = models.CharField(db_column='PRODUCTION_MODE',max_length=10,null=True)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)
	QTY_RELEASED_UOM = models.CharField(db_column='QTY_RELEASED_UOM',max_length=3,null=True)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=True)

	class Meta:
		unique_together = (('RELEASED_HDR_ID',),)


# Position: 125 ################ Table DESC: Reservation/dependent Requirements ####################
class MPM_RESBL(models.Model):
	BDART = models.CharField(db_column='BDART',max_length=2,null=True)
	BWART = models.CharField(db_column='BWART',max_length=3,null=True)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=False)
	BDMNG = models.DecimalField(db_column='BDMNG',max_digits=13,decimal_places=3,null=True)
	RSART = models.CharField(db_column='RSART',max_length=1,null=False)
	HU_MANAGED = models.CharField(db_column='HU_MANAGED',max_length=1,null=True)
	ENMNG = models.DecimalField(db_column='ENMNG',max_digits=13,decimal_places=3,null=True)
	STORAGE_BIN = models.CharField(db_column='STORAGE_BIN',max_length=10,null=True)
	BACKFLUSH = models.CharField(db_column='BACKFLUSH',max_length=1,null=True)
	AVOAU = models.DecimalField(db_column='AVOAU',max_digits=9,decimal_places=3,null=True)
	SCHGT = models.CharField(db_column='SCHGT',max_length=1,null=True)
	UPSKZ = models.CharField(db_column='UPSKZ',max_length=1,null=True)
	APLZL = models.CharField(db_column='APLZL',max_length=8,null=False)
	BEIKZ = models.CharField(db_column='BEIKZ',max_length=1,null=True)
	MATNR_VERSION = models.CharField(db_column='MATNR_VERSION',max_length=10,null=True)
	DBSKZ = models.CharField(db_column='DBSKZ',max_length=1,null=True)
	NETAU = models.CharField(db_column='NETAU',max_length=1,null=True)
	WAREHOUSE_NO = models.CharField(db_column='WAREHOUSE_NO',max_length=3,null=True)
	MATNR_EXTERNAL = models.CharField(db_column='MATNR_EXTERNAL',max_length=40,null=True)
	VORNR = models.CharField(db_column='VORNR',max_length=4,null=False)
	KZKUP = models.CharField(db_column='KZKUP',max_length=1,null=True)
	MATNR = models.CharField(db_column='MATNR',max_length=40,null=True)
	CHARG = models.CharField(db_column='CHARG',max_length=10,null=True)
	SBTER = models.DateField(db_column='SBTER',null=True)
	SOBKZ = models.CharField(db_column='SOBKZ',max_length=1,null=True)
	VERTI = models.CharField(db_column='VERTI',max_length=4,null=True)
	LGORT = models.CharField(db_column='LGORT',max_length=4,null=True)
	FMENG = models.CharField(db_column='FMENG',max_length=1,null=True)
	MEINS = models.CharField(db_column='MEINS',max_length=3,null=True)
	AUFNR = models.CharField(db_column='AUFNR',max_length=12,null=False)
	MATNR_GUID = models.CharField(db_column='MATNR_GUID',max_length=32,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	RSNUM = models.CharField(db_column='RSNUM',max_length=10,null=False)
	SHKZG = models.CharField(db_column='SHKZG',max_length=3,null=True)
	POSNR = models.CharField(db_column='POSNR',max_length=4,null=True)
	PSA_NO = models.CharField(db_column='PSA_NO',max_length=10,null=True)
	VMENG = models.DecimalField(db_column='VMENG',max_digits=15,decimal_places=3,null=True)
	RSPOS = models.CharField(db_column='RSPOS',max_length=4,null=False)
	BDTER = models.DateField(db_column='BDTER',null=True)
	STORAGE_TYPE = models.CharField(db_column='STORAGE_TYPE',max_length=3,null=True)
	AUSCH = models.DecimalField(db_column='AUSCH',max_digits=9,decimal_places=3,null=True)

	class Meta:
		unique_together = (('CLIENT','WERKS','AUFNR','APLZL','VORNR','RSNUM','RSPOS','RSART',),)


# Position: 126 ################ Table DESC: Scheduled down ####################
class MPM_SCHEDULED_DOWN(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=True)
	START_TIME = models.TimeField(db_column='START_TIME',null=True)
	REASON_CODE9 = models.CharField(db_column='REASON_CODE9',max_length=10,null=True)
	REASON_CODE8 = models.CharField(db_column='REASON_CODE8',max_length=10,null=True)
	START_DATE_UTC = models.DateField(db_column='START_DATE_UTC',null=True)
	START_TIME_UTC = models.TimeField(db_column='START_TIME_UTC',null=True)
	END_TIME_UTC = models.TimeField(db_column='END_TIME_UTC',null=True)
	SCHED_DOWN_ID = models.IntegerField(db_column='SCHED_DOWN_ID',null=False)
	END_DATE = models.DateField(db_column='END_DATE',null=True)
	CHANGE_TIMESTAMP = models.DateTimeField(db_column='CHANGE_TIMESTAMP',null=True)
	END_TIME = models.TimeField(db_column='END_TIME',null=True)
	REASON_CODE10 = models.CharField(db_column='REASON_CODE10',max_length=10,null=True)
	REASON_CODE5 = models.CharField(db_column='REASON_CODE5',max_length=10,null=True)
	REASON_CODE4 = models.CharField(db_column='REASON_CODE4',max_length=10,null=True)
	REASON_CODE7 = models.CharField(db_column='REASON_CODE7',max_length=10,null=True)
	REASON_CODE6 = models.CharField(db_column='REASON_CODE6',max_length=10,null=True)
	REASON_CODE1 = models.CharField(db_column='REASON_CODE1',max_length=10,null=True)
	REASON_CODE3 = models.CharField(db_column='REASON_CODE3',max_length=10,null=True)
	REASON_CODE2 = models.CharField(db_column='REASON_CODE2',max_length=10,null=True)
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	EFFEC_DURATION = models.BigIntegerField(db_column='EFFEC_DURATION',null=True)
	START_DATE = models.DateField(db_column='START_DATE',null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=True)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	END_DATE_UTC = models.DateField(db_column='END_DATE_UTC',null=True)
	CHANGED_BY = models.CharField(db_column='CHANGED_BY',max_length=20,null=True)

	class Meta:
		unique_together = (('SCHED_DOWN_ID',),)


# Position: 127 ################ Table DESC: MPM_SEQUENCES ####################
class MPM_SEQUENCES(models.Model):
	GEN_KEY = models.CharField(db_column='GEN_KEY',max_length=100,null=False)
	GEN_VALUE = models.BigIntegerField(db_column='GEN_VALUE',null=True)

	class Meta:
		unique_together = (('GEN_KEY',),)


# Position: 128 ################ Table DESC: MPM_SERVICES_DEF ####################
class MPM_SERVICES_DEF(models.Model):
	SERVICE_NAME = models.CharField(db_column='SERVICE_NAME',max_length=255,null=False)
	FQ_BEAN_NAME = models.CharField(db_column='FQ_BEAN_NAME',max_length=255,null=False)
	SERVICE_ID = models.BigIntegerField(db_column='SERVICE_ID',null=False)
	JNDI_LOOK_UP_NAME = models.CharField(db_column='JNDI_LOOK_UP_NAME',max_length=100,null=True)

	class Meta:
		unique_together = (('SERVICE_ID',),)


# Position: 129 ################ Table DESC: MPM_SHIFT_HANDOVER ####################
class MPM_SHIFT_HANDOVER(models.Model):
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=20,null=True)
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	SHIFT_START_TIME = models.TimeField(db_column='SHIFT_START_TIME',null=True)
	SHIFT_END_DATE = models.DateField(db_column='SHIFT_END_DATE',null=True)
	HANDOVER_TIMESTAMP = models.DateTimeField(db_column='HANDOVER_TIMESTAMP',null=True)
	COMMENTS = models.CharField(db_column='COMMENTS',max_length=250,null=True)
	NODE_ID = models.CharField(db_column='NODE_ID',max_length=32,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	SHIFT_ID = models.CharField(db_column='SHIFT_ID',max_length=4,null=False)
	HANDOVER_TIME = models.TimeField(db_column='HANDOVER_TIME',null=True)
	HANDOVER_BY = models.CharField(db_column='HANDOVER_BY',max_length=20,null=True)
	SHIFT_START_DATE = models.DateField(db_column='SHIFT_START_DATE',null=True)
	HANDOVER_DATE = models.DateField(db_column='HANDOVER_DATE',null=True)
	CREATION_TIMESTAMP = models.DateTimeField(db_column='CREATION_TIMESTAMP',null=True)
	HANDOVER_ID = models.CharField(db_column='HANDOVER_ID',max_length=12,null=False)
	HANDOVER_TO = models.CharField(db_column='HANDOVER_TO',max_length=20,null=True)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	SHIFT_END_TIME = models.TimeField(db_column='SHIFT_END_TIME',null=True)

	class Meta:
		unique_together = (('HANDOVER_ID',),)


# Position: 130 ################ Table DESC: Status table ####################
class MPM_STATUS(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	STATUS = models.CharField(db_column='STATUS',max_length=4,null=False)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('STATUS','CLIENT','PLANT',),)


# Position: 131 ################ Table DESC: Status Description Table ####################
class MPM_STATUS_DESC(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	STATUS = models.CharField(db_column='STATUS',max_length=4,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('STATUS','LANG','CLIENT','PLANT',),)


# Position: 132 ################ Table DESC: Standard Value Key ####################
class MPM_STD_VAL_KEY(models.Model):
	PAR05 = models.CharField(db_column='PAR05',max_length=6,null=True)
	PAR06 = models.CharField(db_column='PAR06',max_length=6,null=True)
	RKMLZT_01 = models.CharField(db_column='RKMLZT_01',max_length=1,null=True)
	PAR03 = models.CharField(db_column='PAR03',max_length=6,null=True)
	PARN1 = models.CharField(db_column='PARN1',max_length=6,null=True)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	PAR04 = models.CharField(db_column='PAR04',max_length=6,null=True)
	PAR01 = models.CharField(db_column='PAR01',max_length=6,null=True)
	BDE03 = models.CharField(db_column='BDE03',max_length=1,null=True)
	SAKL_01 = models.CharField(db_column='SAKL_01',max_length=1,null=True)
	PAR02 = models.CharField(db_column='PAR02',max_length=6,null=True)
	BDE04 = models.CharField(db_column='BDE04',max_length=1,null=True)
	BDE01 = models.CharField(db_column='BDE01',max_length=1,null=True)
	BDE02 = models.CharField(db_column='BDE02',max_length=1,null=True)
	SAKL_02 = models.CharField(db_column='SAKL_02',max_length=1,null=True)
	BDE05 = models.CharField(db_column='BDE05',max_length=1,null=True)
	BDE06 = models.CharField(db_column='BDE06',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	RKRCZT_01 = models.CharField(db_column='RKRCZT_01',max_length=1,null=True)
	RKRCFR_01 = models.CharField(db_column='RKRCFR_01',max_length=6,null=True)
	GENER = models.CharField(db_column='GENER',max_length=1,null=True)
	VGWTS = models.CharField(db_column='VGWTS',max_length=4,null=False)

	class Meta:
		unique_together = (('CLIENT','VGWTS',),)


# Position: 133 ################ Table DESC: Standard Value Key Text ####################
class MPM_STD_VAL_KEYT(models.Model):
	SPRAS = models.CharField(db_column='SPRAS',max_length=2,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	VGWTS = models.CharField(db_column='VGWTS',max_length=4,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','SPRAS','VGWTS',),)


# Position: 134 ################ Table DESC: Supported Plants ####################
class MPM_SUPPRTD_PLANTS(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=6,null=False)
	ERP_SERVER_TZ = models.CharField(db_column='ERP_SERVER_TZ',max_length=128,null=True)
	ERP_SERVER = models.CharField(db_column='ERP_SERVER',max_length=128,null=True)
	ERP_LOGSYS = models.CharField(db_column='ERP_LOGSYS',max_length=10,null=True)
	OEE_SERVER_TZ = models.CharField(db_column='OEE_SERVER_TZ',max_length=128,null=True)
	EWM_SERVER = models.CharField(db_column='EWM_SERVER',max_length=128,null=True)
	LANG = models.CharField(db_column='LANG',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	OEE_HOST_URL = models.CharField(db_column='OEE_HOST_URL',max_length=128,null=True)

	class Meta:
		unique_together = (('PLANT','CLIENT',),)


# Position: 135 ################ Table DESC: Shift definition ####################
class MPM_TC37A(models.Model):
	KW_PROFIL = models.CharField(db_column='KW_PROFIL',max_length=6,null=True)
	KAPTPROG = models.CharField(db_column='KAPTPROG',max_length=4,null=False)
	BEGDA = models.DateField(db_column='BEGDA',null=True)
	ENDZT = models.TimeField(db_column='ENDZT',null=True)
	VARIA = models.CharField(db_column='VARIA',max_length=1,null=True)
	PAPLAN = models.CharField(db_column='PAPLAN',max_length=4,null=True)
	ENDDA = models.DateField(db_column='ENDDA',null=False)
	EINZT = models.IntegerField(db_column='EINZT',null=True)
	TPROG = models.CharField(db_column='TPROG',max_length=4,null=True)
	SCHGRUP = models.CharField(db_column='SCHGRUP',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	HRENDDA = models.DateField(db_column='HRENDDA',null=True)
	MOTPR = models.CharField(db_column='MOTPR',max_length=2,null=True)
	BEGZT = models.TimeField(db_column='BEGZT',null=True)

	class Meta:
		unique_together = (('CLIENT','SCHGRUP','KAPTPROG','ENDDA',),)


# Position: 136 ################ Table DESC: Break schedule ####################
class MPM_TC37P(models.Model):
	STDAZ = models.DecimalField(db_column='STDAZ',max_digits=5,decimal_places=3,null=True)
	PAPLAN = models.CharField(db_column='PAPLAN',max_length=4,null=False)
	PAUEND = models.TimeField(db_column='PAUEND',null=True)
	SCHGRUP = models.CharField(db_column='SCHGRUP',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	PAUNR = models.CharField(db_column='PAUNR',max_length=2,null=False)
	PADAUER = models.IntegerField(db_column='PADAUER',null=True)
	PAUBEG = models.TimeField(db_column='PAUBEG',null=True)

	class Meta:
		unique_together = (('CLIENT','SCHGRUP','PAPLAN','PAUNR',),)


# Position: 137 ################ Table DESC: Texts for break plans ####################
class MPM_TC37S(models.Model):
	SPRAS = models.CharField(db_column='SPRAS',max_length=2,null=False)
	KTEXT = models.CharField(db_column='KTEXT',max_length=20,null=True)
	PAPLAN = models.CharField(db_column='PAPLAN',max_length=4,null=False)
	SCHGRUP = models.CharField(db_column='SCHGRUP',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	PAUNR = models.CharField(db_column='PAUNR',max_length=2,null=False)

	class Meta:
		unique_together = (('CLIENT','SCHGRUP','PAPLAN','PAUNR','SPRAS',),)


# Position: 138 ################ Table DESC: Texts for shift definitions ####################
class MPM_TC37T(models.Model):
	SPRAS = models.CharField(db_column='SPRAS',max_length=2,null=False)
	KTEXT = models.CharField(db_column='KTEXT',max_length=15,null=True)
	KAPTPROG = models.CharField(db_column='KAPTPROG',max_length=4,null=False)
	ENDDA = models.DateField(db_column='ENDDA',null=False)
	SCHGRUP = models.CharField(db_column='SCHGRUP',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','SCHGRUP','KAPTPROG','ENDDA','SPRAS',),)


# Position: 139 ################ Table DESC: Basic Time Element ####################
class MPM_TIMEELEM(models.Model):
	TIMEELEM_TYPE = models.CharField(db_column='TIMEELEM_TYPE',max_length=10,null=True)
	TIME_ELEMENT = models.CharField(db_column='TIME_ELEMENT',max_length=20,null=False)
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','TIME_ELEMENT',),)


# Position: 140 ################ Table DESC: Basic Time Element Text ####################
class MPM_TIMEELEMT(models.Model):
	TIME_ELEMENT = models.CharField(db_column='TIME_ELEMENT',max_length=20,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','LANG','TIME_ELEMENT',),)


# Position: 141 ################ Table DESC: Units of Measurement ####################
class MPM_UOM(models.Model):
	IS_DELETED = models.CharField(db_column='IS_DELETED',max_length=1,null=True)
	MSEHI = models.CharField(db_column='MSEHI',max_length=3,null=False)
	DIMID = models.CharField(db_column='DIMID',max_length=6,null=True)
	TEMP_UNIT = models.CharField(db_column='TEMP_UNIT',max_length=3,null=True)
	EXP10 = models.IntegerField(db_column='EXP10',null=True)
	EXPON = models.IntegerField(db_column='EXPON',null=True)
	TEMP_VALUE = models.DecimalField(db_column='TEMP_VALUE',max_digits=16,decimal_places=3,null=True)
	KZ2EH = models.CharField(db_column='KZ2EH',max_length=1,null=True)
	ANDEC = models.IntegerField(db_column='ANDEC',null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	KZ1EH = models.CharField(db_column='KZ1EH',max_length=1,null=True)
	KZWOB = models.CharField(db_column='KZWOB',max_length=1,null=True)
	ZAEHL = models.BigIntegerField(db_column='ZAEHL',null=True)
	NENNR = models.BigIntegerField(db_column='NENNR',null=True)
	ISOCODE = models.CharField(db_column='ISOCODE',max_length=3,null=True)
	DECAN = models.IntegerField(db_column='DECAN',null=True)
	FAMUNIT = models.CharField(db_column='FAMUNIT',max_length=1,null=True)
	KZKEH = models.CharField(db_column='KZKEH',max_length=1,null=True)
	ADDKO = models.DecimalField(db_column='ADDKO',max_digits=9,decimal_places=3,null=True)
	ISPRIM = models.CharField(db_column='ISPRIM',max_length=1,null=True)
	KZEX3 = models.CharField(db_column='KZEX3',max_length=1,null=True)
	KZEX6 = models.CharField(db_column='KZEX6',max_length=1,null=True)

	class Meta:
		unique_together = (('CLIENT','MSEHI',),)


# Position: 142 ################ Table DESC: Assign Internal to Language-Dependent Unit ####################
class MPM_UOMT(models.Model):
	SPRAS = models.CharField(db_column='SPRAS',max_length=1,null=False)
	MSEHL = models.CharField(db_column='MSEHL',max_length=30,null=True)
	MSEH3_2 = models.CharField(db_column='MSEH3_2',max_length=3,null=True)
	MSEHT = models.CharField(db_column='MSEHT',max_length=10,null=True)
	MSEH3 = models.CharField(db_column='MSEH3',max_length=3,null=False)
	LAISO = models.CharField(db_column='LAISO',max_length=2,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	MSEH6 = models.CharField(db_column='MSEH6',max_length=6,null=True)

	class Meta:
		unique_together = (('CLIENT','SPRAS','MSEH3',),)


# Position: 143 ################ Table DESC: MPM_OEE_USR_DEFAULTS ####################
class MPM_USR_DFTS(models.Model):
	PLANT = models.CharField(db_column='PLANT',max_length=4,null=False)
	USERID = models.CharField(db_column='USERID',max_length=20,null=False)
	CHANGETIMESTAMP = models.DateTimeField(db_column='CHANGETIMESTAMP',null=True)
	PARAM = models.CharField(db_column='PARAM',max_length=40,null=False)
	PARAMVALUE = models.CharField(db_column='PARAMVALUE',max_length=250,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','PLANT','USERID','PARAM',),)


# Position: 144 ################ Table DESC: Activity Option ####################
class MPM_VERSION_GEN(models.Model):
	GEN_KEY = models.CharField(db_column='GEN_KEY',max_length=256,null=False)
	GEN_VALUE = models.BigIntegerField(db_column='GEN_VALUE',null=False)

	class Meta:
		unique_together = (('GEN_KEY',),)


# Position: 145 ################ Table DESC: MPM_VERSION_INIT ####################
class MPM_VERSION_INIT(models.Model):
	PROP_VALUE = models.CharField(db_column='PROP_VALUE',max_length=100,null=True)
	PROP_NAME = models.CharField(db_column='PROP_NAME',max_length=30,null=False)
	VERSION = models.BigIntegerField(db_column='VERSION',null=False)

	class Meta:
		unique_together = (('PROP_NAME',),)


# Position: 146 ################ Table DESC: Intervals of available capacity ####################
class MPM_WC_CAP_AVL_IVL(models.Model):
	KKOPF = models.CharField(db_column='KKOPF',max_length=1,null=True)
	VERSN = models.CharField(db_column='VERSN',max_length=2,null=False)
	DATUV = models.DateField(db_column='DATUV',null=True)
	ANZTG = models.CharField(db_column='ANZTG',max_length=2,null=True)
	DATUB = models.DateField(db_column='DATUB',null=False)
	OBJID = models.CharField(db_column='OBJID',max_length=8,null=False)
	KAPID = models.CharField(db_column='KAPID',max_length=8,null=False)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	ANZSH = models.CharField(db_column='ANZSH',max_length=1,null=True)
	SPROG = models.CharField(db_column='SPROG',max_length=4,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','OBJID','KAPID','VERSN','DATUB',),)


# Position: 147 ################ Table DESC: Daily capacity requirements ####################
class MPM_WC_DLY_CAP_REQ(models.Model):
	VERSN = models.CharField(db_column='VERSN',max_length=2,null=False)
	DATUV = models.DateField(db_column='DATUV',null=False)
	KEINH = models.CharField(db_column='KEINH',max_length=3,null=True)
	DATUB = models.DateField(db_column='DATUB',null=True)
	OBJID = models.CharField(db_column='OBJID',max_length=8,null=False)
	KAPID = models.CharField(db_column='KAPID',max_length=8,null=False)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	ANGEB = models.DecimalField(db_column='ANGEB',max_digits=16,decimal_places=3,null=True)

	class Meta:
		unique_together = (('CLIENT','OBJID','KAPID','VERSN','DATUV',),)


# Position: 148 ################ Table DESC: Work Center Capacity Allocation ####################
class MPM_WRKCTR_CAP_ALC(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 149 ################ Table DESC: Work Center Capacity Header ####################
class MPM_WRKCTR_CAP_HDR(models.Model):
	PLANR = models.CharField(db_column='PLANR',max_length=3,null=True)
	ENDZT = models.IntegerField(db_column='ENDZT',null=True)
	OBJID = models.CharField(db_column='OBJID',max_length=8,null=False)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	VERSA = models.CharField(db_column='VERSA',max_length=2,null=True)
	ANG_MIN = models.DecimalField(db_column='ANG_MIN',max_digits=13,decimal_places=3,null=True)
	PAUSE = models.IntegerField(db_column='PAUSE',null=True)
	KAPAR = models.CharField(db_column='KAPAR',max_length=3,null=True)
	BEGZT = models.IntegerField(db_column='BEGZT',null=True)
	ANG_MAX = models.DecimalField(db_column='ANG_MAX',max_digits=13,decimal_places=3,null=True)
	UEBERLAST = models.CharField(db_column='UEBERLAST',max_length=3,null=True)
	KAPEH = models.CharField(db_column='KAPEH',max_length=3,null=True)
	POOLK = models.CharField(db_column='POOLK',max_length=1,null=True)
	AZNOR = models.IntegerField(db_column='AZNOR',null=True)
	KAPIE = models.CharField(db_column='KAPIE',max_length=8,null=True)
	KAPID = models.CharField(db_column='KAPID',max_length=8,null=False)
	MEINS = models.CharField(db_column='MEINS',max_length=3,null=True)
	REFID = models.CharField(db_column='REFID',max_length=8,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	KALID = models.CharField(db_column='KALID',max_length=2,null=True)
	MOSID = models.CharField(db_column='MOSID',max_length=2,null=True)
	NAME = models.CharField(db_column='NAME',max_length=8,null=True)
	NGRAD = models.CharField(db_column='NGRAD',max_length=3,null=True)
	KAPTER = models.CharField(db_column='KAPTER',max_length=1,null=True)
	KAPAVO = models.CharField(db_column='KAPAVO',max_length=1,null=True)
	ANG_UNIT = models.CharField(db_column='ANG_UNIT',max_length=3,null=True)
	KAPLPL = models.CharField(db_column='KAPLPL',max_length=1,null=True)

	class Meta:
		unique_together = (('CLIENT','OBJID','KAPID',),)


# Position: 150 ################ Table DESC: Work Center Capacity Allocation ####################
class MPM_WRKCTR_CAP_MAP(models.Model):
	FORK1 = models.CharField(db_column='FORK1',max_length=6,null=True)
	VERTN = models.CharField(db_column='VERTN',max_length=8,null=True)
	FORKN = models.CharField(db_column='FORKN',max_length=6,null=True)
	OBJID = models.CharField(db_column='OBJID',max_length=8,null=False)
	KAPID = models.CharField(db_column='KAPID',max_length=8,null=False)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	VERT1 = models.CharField(db_column='VERT1',max_length=8,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	FORK3 = models.CharField(db_column='FORK3',max_length=6,null=True)
	FORK2 = models.CharField(db_column='FORK2',max_length=6,null=True)

	class Meta:
		unique_together = (('CLIENT','OBJID','KAPID',),)


# Position: 151 ################ Table DESC: Capacity shift value ####################
class MPM_WRKCTR_CAP_SFT(models.Model):
	TAGNR = models.CharField(db_column='TAGNR',max_length=3,null=False)
	VERSN = models.CharField(db_column='VERSN',max_length=2,null=False)
	FABTG = models.CharField(db_column='FABTG',max_length=1,null=True)
	ENDZT = models.BigIntegerField(db_column='ENDZT',null=True)
	ANZHL = models.IntegerField(db_column='ANZHL',null=True)
	OBJID = models.CharField(db_column='OBJID',max_length=8,null=False)
	KAPID = models.CharField(db_column='KAPID',max_length=8,null=False)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	EINZT = models.BigIntegerField(db_column='EINZT',null=True)
	TPROG = models.CharField(db_column='TPROG',max_length=4,null=True)
	KAPAZ = models.BigIntegerField(db_column='KAPAZ',null=True)
	SCHNR = models.CharField(db_column='SCHNR',max_length=1,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	ANG_MIN = models.DecimalField(db_column='ANG_MIN',max_digits=13,decimal_places=3,null=True)
	NGRAD = models.CharField(db_column='NGRAD',max_length=3,null=True)
	PAUSE = models.BigIntegerField(db_column='PAUSE',null=True)
	DATUB = models.DateField(db_column='DATUB',null=False)
	BEGZT = models.BigIntegerField(db_column='BEGZT',null=True)
	ANG_MAX = models.DecimalField(db_column='ANG_MAX',max_digits=13,decimal_places=3,null=True)

	class Meta:
		unique_together = (('CLIENT','OBJID','KAPID','VERSN','DATUB','TAGNR','SCHNR',),)


# Position: 152 ################ Table DESC: Capacity base unit assignment ####################
class MPM_WRKCTR_CAP_UOM(models.Model):
	NENNR = models.BigIntegerField(db_column='NENNR',null=True)
	ZAEHL = models.BigIntegerField(db_column='ZAEHL',null=True)
	MEINB = models.CharField(db_column='MEINB',max_length=3,null=True)
	OBJID = models.CharField(db_column='OBJID',max_length=8,null=False)
	KAPID = models.CharField(db_column='KAPID',max_length=8,null=False)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	MEINS = models.CharField(db_column='MEINS',max_length=3,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','OBJID','KAPID','MEINS',),)


# Position: 153 ################ Table DESC: Assignment of Work Center to Cost Center(CRCO) ####################
class MPM_WRKCTR_COST(models.Model):
	LASET = models.CharField(db_column='LASET',max_length=6,null=False)
	AEDAT_KOST = models.DateField(db_column='AEDAT_KOST',null=True)
	ACTXY = models.CharField(db_column='ACTXY',max_length=1,null=True)
	KOSTL = models.CharField(db_column='KOSTL',max_length=10,null=True)
	BDE = models.CharField(db_column='BDE',max_length=1,null=True)
	BEGDA = models.DateField(db_column='BEGDA',null=True)
	OBJTY = models.CharField(db_column='OBJTY',max_length=2,null=False)
	AENAM_KOST = models.CharField(db_column='AENAM_KOST',max_length=12,null=True)
	LEINH = models.CharField(db_column='LEINH',max_length=3,null=True)
	ENDDA = models.DateField(db_column='ENDDA',null=False)
	SAKL = models.CharField(db_column='SAKL',max_length=1,null=True)
	OBJID = models.CharField(db_column='OBJID',max_length=8,null=False)
	LSTAR_REF = models.CharField(db_column='LSTAR_REF',max_length=1,null=True)
	LSTAR = models.CharField(db_column='LSTAR',max_length=6,null=True)
	KOKRS = models.CharField(db_column='KOKRS',max_length=4,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	ACTXK = models.CharField(db_column='ACTXK',max_length=4,null=True)
	FORML = models.CharField(db_column='FORML',max_length=6,null=True)
	PRZ = models.CharField(db_column='PRZ',max_length=12,null=True)
	LANUM = models.CharField(db_column='LANUM',max_length=4,null=False)

	class Meta:
		unique_together = (('CLIENT','OBJTY','OBJID','LASET','ENDDA','LANUM',),)


# Position: 154 ################ Table DESC: Work Center Header ####################
class MPM_WRKCTR_HDR(models.Model):
	PAR05 = models.CharField(db_column='PAR05',max_length=6,null=True)
	PAR06 = models.CharField(db_column='PAR06',max_length=6,null=True)
	PAR03 = models.CharField(db_column='PAR03',max_length=6,null=True)
	ORTGR = models.CharField(db_column='ORTGR',max_length=4,null=True)
	PAR04 = models.CharField(db_column='PAR04',max_length=6,null=True)
	PAR01 = models.CharField(db_column='PAR01',max_length=6,null=True)
	PARU6 = models.CharField(db_column='PARU6',max_length=3,null=True)
	PAR02 = models.CharField(db_column='PAR02',max_length=6,null=True)
	PARU4 = models.CharField(db_column='PARU4',max_length=3,null=True)
	WERKS = models.CharField(db_column='WERKS',max_length=4,null=True)
	PARU5 = models.CharField(db_column='PARU5',max_length=3,null=True)
	PLANV = models.CharField(db_column='PLANV',max_length=3,null=True)
	OBJID = models.CharField(db_column='OBJID',max_length=8,null=False)
	MSGFN = models.CharField(db_column='MSGFN',max_length=3,null=True)
	STAND = models.CharField(db_column='STAND',max_length=10,null=True)
	RESGR = models.CharField(db_column='RESGR',max_length=8,null=True)
	ZGR02 = models.CharField(db_column='ZGR02',max_length=3,null=True)
	ZGR01 = models.CharField(db_column='ZGR01',max_length=3,null=True)
	ARBPL = models.CharField(db_column='ARBPL',max_length=8,null=True)
	MIXMAT = models.CharField(db_column='MIXMAT',max_length=1,null=True)
	PARV3 = models.DecimalField(db_column='PARV3',max_digits=9,decimal_places=3,null=True)
	VGWTS = models.CharField(db_column='VGWTS',max_length=4,null=True)
	PARV4 = models.DecimalField(db_column='PARV4',max_digits=9,decimal_places=3,null=True)
	PARV1 = models.DecimalField(db_column='PARV1',max_digits=9,decimal_places=3,null=True)
	PARV2 = models.DecimalField(db_column='PARV2',max_digits=9,decimal_places=3,null=True)
	FORTN = models.CharField(db_column='FORTN',max_length=6,null=True)
	VGM05 = models.CharField(db_column='VGM05',max_length=1,null=True)
	ZGR04 = models.CharField(db_column='ZGR04',max_length=3,null=True)
	VGM04 = models.CharField(db_column='VGM04',max_length=1,null=True)
	ZGR03 = models.CharField(db_column='ZGR03',max_length=3,null=True)
	ZGR06 = models.CharField(db_column='ZGR06',max_length=3,null=True)
	VGM06 = models.CharField(db_column='VGM06',max_length=1,null=True)
	ZGR05 = models.CharField(db_column='ZGR05',max_length=3,null=True)
	VGM01 = models.CharField(db_column='VGM01',max_length=1,null=True)
	VGM03 = models.CharField(db_column='VGM03',max_length=1,null=True)
	VGM02 = models.CharField(db_column='VGM02',max_length=1,null=True)
	PARV5 = models.DecimalField(db_column='PARV5',max_digits=9,decimal_places=3,null=True)
	PARV6 = models.DecimalField(db_column='PARV6',max_digits=9,decimal_places=3,null=True)
	KAPID = models.CharField(db_column='KAPID',max_length=8,null=True)
	VERAN = models.CharField(db_column='VERAN',max_length=3,null=True)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)
	FORT3 = models.CharField(db_column='FORT3',max_length=6,null=True)
	FORT2 = models.CharField(db_column='FORT2',max_length=6,null=True)
	PARU2 = models.CharField(db_column='PARU2',max_length=3,null=True)
	FORT1 = models.CharField(db_column='FORT1',max_length=6,null=True)
	PARU3 = models.CharField(db_column='PARU3',max_length=3,null=True)
	PARU1 = models.CharField(db_column='PARU1',max_length=3,null=True)
	LGORT_RES = models.CharField(db_column='LGORT_RES',max_length=4,null=True)

	class Meta:
		unique_together = (('CLIENT','OBJID',),)


# Position: 155 ################ Table DESC: Work Center Header Text ####################
class MPM_WRKCTR_HDRT(models.Model):
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	OBJID = models.CharField(db_column='OBJID',max_length=8,null=False)
	LANG = models.CharField(db_column='LANG',max_length=2,null=False)
	CLIENT = models.CharField(db_column='CLIENT',max_length=3,null=False)

	class Meta:
		unique_together = (('CLIENT','OBJID','LANG',),)


# Position: 156 ################ Table DESC: Workflow Configuration ####################
class MPM_WRKFLOW_CONFIG(models.Model):
	STEP_ID = models.CharField(db_column='STEP_ID',max_length=128,null=False)
	VAL = models.CharField(db_column='VAL',max_length=1024,null=True)
	TYPE_ID = models.CharField(db_column='TYPE_ID',max_length=128,null=False)

	class Meta:
		unique_together = (('TYPE_ID','STEP_ID',),)


# Position: 157 ################ Table DESC: OEE_ACTIVITIES ####################
class OEE_ACTIVITIES(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 158 ################ Table DESC: OBSOLETE ####################
class OEE_ADDCP(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 159 ################ Table DESC: OBSOLETE ####################
class OEE_ADDCPDF(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 160 ################ Table DESC: OBSOLETE ####################
class OEE_ADDCPDFT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 161 ################ Table DESC: OBSOLETE ####################
class OEE_ADDCPT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 162 ################ Table DESC: Files ####################
class OEE_FILES(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 163 ################ Table DESC: Global Configurations ####################
class OEE_GLOBAL_CONFIG(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 164 ################ Table DESC: OBSOLETE ####################
class OEE_HTMPL(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 165 ################ Table DESC: OBSOLETE ####################
class OEE_HTMPLT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 166 ################ Table DESC: OBSOLETE ####################
class OEE_HTNT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 167 ################ Table DESC: OBSOLETE ####################
class OEE_HTNTDK(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 168 ################ Table DESC: OBSOLETE ####################
class OEE_HTNTREL(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 169 ################ Table DESC: OBSOLETE ####################
class OEE_HTNTT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 170 ################ Table DESC: OEE KPI ####################
class OEE_KPI(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 171 ################ Table DESC: OEE KPI Texts ####################
class OEE_KPIT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 172 ################ Table DESC: OEE_LSTCONF_UPDATE ####################
class OEE_LSTCONF_UPDATE(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 173 ################ Table DESC: Machine Group ####################
class OEE_MCGRP(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 174 ################ Table DESC: Machine Group Texts ####################
class OEE_MCGRPT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 175 ################ Table DESC: Messages ####################
class OEE_MESSAGE(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 176 ################ Table DESC: Message Queue ####################
class OEE_MESSAGE_QUEUE(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 177 ################ Table DESC: OEE_POD ####################
class OEE_POD(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 178 ################ Table DESC: OEE_POD_SECTION ####################
class OEE_POD_SECTION(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 179 ################ Table DESC: User Group and POD Assignment ####################
class OEE_POD_UG_ASSGNMT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 180 ################ Table DESC: Production Mode ####################
class OEE_PRDMODE(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 181 ################ Table DESC: Production Mode Text ####################
class OEE_PRDMODET(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 182 ################ Table DESC: OEE_PROFILE ####################
class OEE_PROFILE(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 183 ################ Table DESC: Message Queue ####################
class OEE_QUEUE(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 184 ################ Table DESC: Reason Code ####################
class OEE_RC(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 185 ################ Table DESC: OBSOLETE ####################
class OEE_RCPROF(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 186 ################ Table DESC: OBSOLETE ####################
class OEE_RCPROFCA(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 187 ################ Table DESC: OBSOLETE ####################
class OEE_RCPROFT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 188 ################ Table DESC: Reason Code Text ####################
class OEE_RCT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 189 ################ Table DESC: OBSOLETE ####################
class OEE_STATES(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 190 ################ Table DESC: OBSOLETE ####################
class OEE_STATEST(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 191 ################ Table DESC: OBSOLETE ####################
class OEE_STPROF(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 192 ################ Table DESC: OBSOLETE ####################
class OEE_STPROFSA(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 193 ################ Table DESC: None ####################
class OEE_STPROFT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 194 ################ Table DESC: Supported Plants ####################
class OEE_SUPPRTD_PLANTS(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 195 ################ Table DESC: Basic Time Element ####################
class OEE_TIMEELEM(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 196 ################ Table DESC: Basic Time Element Text ####################
class OEE_TIMEELEMT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 197 ################ Table DESC: Workflow Configuration ####################
class OEE_WRKFLOW_CONFIG(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 198 ################ Table DESC: TMP_GDS_ISS_DET ####################
class TMP_GDS_ISS_DET(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 199 ################ Table DESC: TMP_MPM_EXT_DESC ####################
class TMP_MPM_EXT_DESC(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 200 ################ Table DESC: TMP_PH_NODE ####################
class TMP_PH_NODE(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 201 ################ Table DESC: TMP_SSCC_DETAILS ####################
class TMP_SSCC_DETAILS(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 202 ################ Table DESC: TMP_VER_GEN ####################
class TMP_VER_GEN(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 203 ################ Table DESC: Activation Requests Submitted to CBS ####################
class XMII_ACTREQUEST(models.Model):
	STATUS = models.CharField(db_column='STATUS',max_length=20,null=False)
	USERNAME = models.CharField(db_column='USERNAME',max_length=75,null=False)
	ENTRYDATE = models.DateTimeField(db_column='ENTRYDATE',null=False)
	REQUESTID = models.BigIntegerField(db_column='REQUESTID',null=False)

	class Meta:
		unique_together = (('REQUESTID',),)


# Position: 204 ################ Table DESC: XMII_ALERT ####################
class XMII_ALERT(models.Model):
	EXPIRATION = models.IntegerField(db_column='EXPIRATION',null=True)
	SOURCEOBJECT = models.CharField(db_column='SOURCEOBJECT',max_length=255,null=False)
	STATUS = models.IntegerField(db_column='STATUS',null=False)
	LONGTEXT = models.CharField(db_column='LONGTEXT',max_length=255,null=True)
	LASTACTIONON = models.DateTimeField(db_column='LASTACTIONON',null=True)
	REMARKS = models.BinaryField(db_column='REMARKS',max_length=1024*1024,null=True)
	FILEPATH = models.CharField(db_column='FILEPATH',max_length=255,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	SHORTTEXT = models.CharField(db_column='SHORTTEXT',max_length=50,null=True)
	RAISEDON = models.DateTimeField(db_column='RAISEDON',null=False)
	SEVERITY = models.IntegerField(db_column='SEVERITY',null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 205 ################ Table DESC: XMII_ALERT_ACTIONS ####################
class XMII_ALERT_ACTIONS(models.Model):
	URL = models.CharField(db_column='URL',max_length=500,null=True)
	ALERTID = models.BigIntegerField(db_column='ALERTID',null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('ALERTID','NAME',),)


# Position: 206 ################ Table DESC: XMII_ALERT_CLEANUP ####################
class XMII_ALERT_CLEANUP(models.Model):
	OLDERBY = models.BigIntegerField(db_column='OLDERBY',null=False)
	ALERTSTATUS = models.IntegerField(db_column='ALERTSTATUS',null=False)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=100,null=True)
	CREATEDON = models.DateTimeField(db_column='CREATEDON',null=False)
	ALERTPATH = models.CharField(db_column='ALERTPATH',max_length=250,null=False)
	ALERTSEVERITY = models.IntegerField(db_column='ALERTSEVERITY',null=False)
	ENABLED = models.CharField(db_column='ENABLED',max_length=1,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIEDON = models.DateTimeField(db_column='MODIFIEDON',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=False)
	NAME = models.CharField(db_column='NAME',max_length=60,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 207 ################ Table DESC: XMII_ALERT_LOGS ####################
class XMII_ALERT_LOGS(models.Model):
	DATETIME = models.DateTimeField(db_column='DATETIME',null=False)
	USERID = models.CharField(db_column='USERID',max_length=50,null=False)
	ACTIVITY = models.CharField(db_column='ACTIVITY',max_length=500,null=True)
	ALERTID = models.BigIntegerField(db_column='ALERTID',null=False)

	class Meta:
		unique_together = (('ALERTID','DATETIME',),)


# Position: 208 ################ Table DESC: XMII_ALERT_ROLES ####################
class XMII_ALERT_ROLES(models.Model):
	ROLE_USER = models.CharField(db_column='ROLE_USER',max_length=50,null=False)
	ALERTID = models.BigIntegerField(db_column='ALERTID',null=False)

	class Meta:
		unique_together = (('ALERTID','ROLE_USER',),)


# Position: 209 ################ Table DESC: XMII_ALRT_CNTAINER ####################
class XMII_ALRT_CNTAINER(models.Model):
	PROPVALUE = models.CharField(db_column='PROPVALUE',max_length=50,null=True)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=20,null=False)
	ALERTID = models.BigIntegerField(db_column='ALERTID',null=False)

	class Meta:
		unique_together = (('ALERTID','PROPNAME',),)


# Position: 210 ################ Table DESC: XMII_BREAKPOINTS ####################
class XMII_BREAKPOINTS(models.Model):
	ACTIONNAME = models.CharField(db_column='ACTIONNAME',max_length=256,null=False)
	USERNAME = models.CharField(db_column='USERNAME',max_length=100,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	FILE = models.BigIntegerField(db_column='FILE',null=False)
	EXPRESSION = models.BinaryField(db_column='EXPRESSION',null=True)
	BREAKPOINTTYPE = models.IntegerField(db_column='BREAKPOINTTYPE',null=False)

	class Meta:
		unique_together = (('ID','FILE','USERNAME',),)


# Position: 211 ################ Table DESC: XMII_BUFFER ####################
class XMII_BUFFER(models.Model):
	STATUS = models.IntegerField(db_column='STATUS',null=False)
	FILTER = models.CharField(db_column='FILTER',max_length=255,null=False)
	RETRY_COUNT = models.IntegerField(db_column='RETRY_COUNT',null=False)
	LAST_RETRY_DATE = models.DateTimeField(db_column='LAST_RETRY_DATE',null=False)
	ENTRY_DATA = models.BinaryField(db_column='ENTRY_DATA',max_length=1024*1024,null=True)
	USERNAME = models.BinaryField(db_column='USERNAME',null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	COMMENT = models.BinaryField(db_column='COMMENT',null=True)
	ENTRY_TYPE = models.IntegerField(db_column='ENTRY_TYPE',null=False)
	INITIAL_DATE_TIME = models.DateTimeField(db_column='INITIAL_DATE_TIME',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 212 ################ Table DESC: XMII_BUFFERHISTORY ####################
class XMII_BUFFERHISTORY(models.Model):
	SYSTEM = models.BinaryField(db_column='SYSTEM',null=True)
	STATUS = models.IntegerField(db_column='STATUS',null=False)
	RETRY_DATE = models.DateTimeField(db_column='RETRY_DATE',null=False)
	BUFFER_ID = models.BigIntegerField(db_column='BUFFER_ID',null=False)
	ERROR = models.BinaryField(db_column='ERROR',null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 213 ################ Table DESC: XMII_BUFFER_JOBS ####################
class XMII_BUFFER_JOBS(models.Model):
	SYSTEM = models.CharField(db_column='SYSTEM',max_length=255,null=True)
	STATUS = models.IntegerField(db_column='STATUS',null=False)
	FILTER = models.CharField(db_column='FILTER',max_length=255,null=False)
	RETRY_INTERVAL = models.BigIntegerField(db_column='RETRY_INTERVAL',null=False)
	DAYS_RETENTION = models.IntegerField(db_column='DAYS_RETENTION',null=False)
	NEXT_RUN_TIME = models.DateTimeField(db_column='NEXT_RUN_TIME',null=False)
	MAX_RETRY_COUNT = models.IntegerField(db_column='MAX_RETRY_COUNT',null=False)

	class Meta:
		unique_together = (('FILTER',),)


# Position: 214 ################ Table DESC: XMII_CAT_INFO ####################
class XMII_CAT_INFO(models.Model):
	UOM = models.CharField(db_column='UOM',max_length=20,null=False)
	CATPATTERN = models.CharField(db_column='CATPATTERN',max_length=50,null=False)
	CATPATTERNUP = models.CharField(db_column='CATPATTERNUP',max_length=50,null=False)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	EUOM = models.CharField(db_column='EUOM',max_length=20,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 215 ################ Table DESC: Table used for Meta-inf of SSCE Extension ####################
class XMII_CE_EXTN(models.Model):
	EXTN_NAME = models.CharField(db_column='EXTN_NAME',max_length=180,null=False)
	PROJECT = models.CharField(db_column='PROJECT',max_length=100,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=200,null=False)
	ENABLED = models.CharField(db_column='ENABLED',max_length=1,null=False)
	EXTN_VALUE = models.BinaryField(db_column='EXTN_VALUE',max_length=1024*1024,null=True)

	class Meta:
		unique_together = (('PROJECT','EXTN_NAME',),)


# Position: 216 ################ Table DESC: XMII_CE_GBL_CNF ####################
class XMII_CE_GBL_CNF(models.Model):
	GROUPNAME = models.CharField(db_column='GROUPNAME',max_length=255,null=False)
	GROUPDESC = models.CharField(db_column='GROUPDESC',max_length=255,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	GROUPTYPE = models.CharField(db_column='GROUPTYPE',max_length=255,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 217 ################ Table DESC: XMII_CE_GBL_CNF_IN ####################
class XMII_CE_GBL_CNF_IN(models.Model):
	GROUPID = models.BigIntegerField(db_column='GROUPID',null=False)
	ISDEFAULT = models.CharField(db_column='ISDEFAULT',max_length=255,null=False)
	CONFIGINSDESC = models.CharField(db_column='CONFIGINSDESC',max_length=255,null=False)
	CONFIGINSNAME = models.CharField(db_column='CONFIGINSNAME',max_length=255,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID','GROUPID',),)


# Position: 218 ################ Table DESC: XMII_CE_GBL_CNF_PR ####################
class XMII_CE_GBL_CNF_PR(models.Model):
	GROUPID = models.BigIntegerField(db_column='GROUPID',null=False)
	PARENTID = models.BigIntegerField(db_column='PARENTID',null=False)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=255,null=False)
	MULTIVALUE = models.CharField(db_column='MULTIVALUE',max_length=10,null=False)
	LANGUAGEKEY = models.CharField(db_column='LANGUAGEKEY',max_length=255,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	COMPOSITE = models.CharField(db_column='COMPOSITE',max_length=10,null=False)

	class Meta:
		unique_together = (('ID','GROUPID',),)


# Position: 219 ################ Table DESC: XMII_CE_GBL_CNF_VL ####################
class XMII_CE_GBL_CNF_VL(models.Model):
	VAL = models.CharField(db_column='VAL',max_length=255,null=True)
	PROPID = models.BigIntegerField(db_column='PROPID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	INSTANCEID = models.BigIntegerField(db_column='INSTANCEID',null=False)
	SETID = models.BigIntegerField(db_column='SETID',null=False)

	class Meta:
		unique_together = (('ID','PROPID','INSTANCEID',),)


# Position: 220 ################ Table DESC: XMII_CHANGELIST ####################
class XMII_CHANGELIST(models.Model):
	STATUS = models.CharField(db_column='STATUS',max_length=25,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=150,null=True)
	CREATEDON = models.DateTimeField(db_column='CREATEDON',null=False)
	DEFAULTCHANGELIST = models.CharField(db_column='DEFAULTCHANGELIST',max_length=10,null=False)
	USERID = models.CharField(db_column='USERID',max_length=80,null=False)
	REMARKS = models.BinaryField(db_column='REMARKS',max_length=1024*1024,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIEDON = models.DateTimeField(db_column='MODIFIEDON',null=True)
	APPROVEDBY = models.CharField(db_column='APPROVEDBY',max_length=15,null=True)
	NAME = models.CharField(db_column='NAME',max_length=50,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 221 ################ Table DESC: XMII_CHANGELIST_ST ####################
class XMII_CHANGELIST_ST(models.Model):
	NAMEUP = models.CharField(db_column='NAMEUP',max_length=50,null=False)
	DESCRIPTIONUP = models.CharField(db_column='DESCRIPTIONUP',max_length=150,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	USERIDUP = models.CharField(db_column='USERIDUP',max_length=80,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 222 ################ Table DESC: XMII_CHANGELST_LOG ####################
class XMII_CHANGELST_LOG(models.Model):
	DATETIME = models.DateTimeField(db_column='DATETIME',null=True)
	CHANGELISTID = models.BigIntegerField(db_column='CHANGELISTID',null=False)
	CLOPERATION = models.CharField(db_column='CLOPERATION',max_length=30,null=True)
	USERID = models.CharField(db_column='USERID',max_length=80,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 223 ################ Table DESC: Client INI for Non Browser Device Configurations ####################
class XMII_CLIENTINI(models.Model):
	MIMETYPE = models.CharField(db_column='MIMETYPE',max_length=32,null=True)
	HEADERFIELDVALUE = models.CharField(db_column='HEADERFIELDVALUE',max_length=32,null=True)
	DEVICE = models.CharField(db_column='DEVICE',max_length=32,null=False)
	HEADERFIELD = models.CharField(db_column='HEADERFIELD',max_length=32,null=True)
	TOKEN = models.CharField(db_column='TOKEN',max_length=32,null=True)

	class Meta:
		unique_together = (('DEVICE',),)


# Position: 224 ################ Table DESC: XMII_CMPNTCATEGORY ####################
class XMII_CMPNTCATEGORY(models.Model):
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	LABEL = models.CharField(db_column='LABEL',max_length=100,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 225 ################ Table DESC: XMII_CMPNTJAR ####################
class XMII_CMPNTJAR(models.Model):
	JARCHECKSUM = models.CharField(db_column='JARCHECKSUM',max_length=32,null=True)
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	DEPLOYCOMPONENT = models.CharField(db_column='DEPLOYCOMPONENT',max_length=100,null=True)
	CONTENT = models.BinaryField(db_column='CONTENT',max_length=1024*1024,null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=False)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 226 ################ Table DESC: XMII_CMPNTLIST ####################
class XMII_CMPNTLIST(models.Model):
	CORE = models.CharField(db_column='CORE',max_length=1,null=False)
	ASSEMBLYNAME = models.CharField(db_column='ASSEMBLYNAME',max_length=200,null=False)
	REQSECURITY = models.CharField(db_column='REQSECURITY',max_length=1,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	COMPONENTTYPE = models.CharField(db_column='COMPONENTTYPE',max_length=50,null=False)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=False)
	LABEL = models.CharField(db_column='LABEL',max_length=100,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	CLASSNAME = models.CharField(db_column='CLASSNAME',max_length=255,null=False)
	DEPENDENCIES = models.CharField(db_column='DEPENDENCIES',max_length=1000,null=True)
	HELPFILENAME = models.CharField(db_column='HELPFILENAME',max_length=100,null=True)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 227 ################ Table DESC: XMII_CONNECTORPROP ####################
class XMII_CONNECTORPROP(models.Model):
	CONNECTORID = models.BigIntegerField(db_column='CONNECTORID',null=False)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=60,null=False)
	PROPDEFAULTVALUE = models.CharField(db_column='PROPDEFAULTVALUE',max_length=200,null=True)

	class Meta:
		unique_together = (('CONNECTORID','PROPNAME',),)


# Position: 228 ################ Table DESC: XMII_CONNECTORS ####################
class XMII_CONNECTORS(models.Model):
	CONNECTORTYPEID = models.BigIntegerField(db_column='CONNECTORTYPEID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	CLASSNAME = models.CharField(db_column='CLASSNAME',max_length=150,null=True)
	NAME = models.CharField(db_column='NAME',max_length=50,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 229 ################ Table DESC: XMII_CONNECTORTYPE ####################
class XMII_CONNECTORTYPE(models.Model):
	ID = models.BigIntegerField(db_column='ID',null=False)
	NAME = models.CharField(db_column='NAME',max_length=5,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 230 ################ Table DESC: XMII_CONNSTORE ####################
class XMII_CONNSTORE(models.Model):
	CONN_ALIAS = models.CharField(db_column='CONN_ALIAS',max_length=50,null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	CONN_TYPE = models.IntegerField(db_column='CONN_TYPE',null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)

	class Meta:
		unique_together = (('CONN_ALIAS','CONN_TYPE',),)


# Position: 231 ################ Table DESC: XMII_CONNSTOREPROP ####################
class XMII_CONNSTOREPROP(models.Model):
	PROP_VALUE = models.CharField(db_column='PROP_VALUE',max_length=200,null=True)
	CONN_ALIAS = models.CharField(db_column='CONN_ALIAS',max_length=50,null=False)
	CONN_TYPE = models.IntegerField(db_column='CONN_TYPE',null=False)
	PROP_NAME = models.CharField(db_column='PROP_NAME',max_length=50,null=False)

	class Meta:
		unique_together = (('CONN_ALIAS','CONN_TYPE','PROP_NAME',),)


# Position: 232 ################ Table DESC: XMII_CONTENTMAPS ####################
class XMII_CONTENTMAPS(models.Model):
	TARGET = models.BinaryField(db_column='TARGET',null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=150,null=True)
	ROLES = models.BinaryField(db_column='ROLES',null=True)
	LASTMODIFIEDDATE = models.DateTimeField(db_column='LASTMODIFIEDDATE',null=True)
	NAME = models.CharField(db_column='NAME',max_length=50,null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 233 ################ Table DESC: XMII_CAT_INFO ####################
class XMII_COST_CAT(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 234 ################ Table DESC: XMII_COST_DATE ####################
class XMII_COST_DATE(models.Model):
	FROMDATE = models.CharField(db_column='FROMDATE',max_length=8,null=False)
	TODATE = models.CharField(db_column='TODATE',max_length=8,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	CATID = models.BigIntegerField(db_column='CATID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 235 ################ Table DESC: XMII_COST_DEF ####################
class XMII_COST_DEF(models.Model):
	RULENAME = models.CharField(db_column='RULENAME',max_length=50,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	RULENAMEUP = models.CharField(db_column='RULENAMEUP',max_length=50,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 236 ################ Table DESC: XMII_COST_DET ####################
class XMII_COST_DET(models.Model):
	HOURID = models.BigIntegerField(db_column='HOURID',null=False)
	CATINFOID = models.BigIntegerField(db_column='CATINFOID',null=False)
	UOM = models.CharField(db_column='UOM',max_length=20,null=False)
	PRICE = models.DecimalField(db_column='PRICE',max_digits=20,decimal_places=3,null=False)
	RULENAME = models.CharField(db_column='RULENAME',max_length=50,null=False)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	CATEGORYNAME = models.CharField(db_column='CATEGORYNAME',max_length=50,null=False)
	COSTID = models.BigIntegerField(db_column='COSTID',null=False)
	DATEID = models.BigIntegerField(db_column='DATEID',null=False)
	EUOM = models.CharField(db_column='EUOM',max_length=20,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 237 ################ Table DESC: XMII_COST_RULE ####################
class XMII_COST_RULE(models.Model):
	FROMHOUR = models.IntegerField(db_column='FROMHOUR',null=False)
	PRICE = models.DecimalField(db_column='PRICE',max_digits=20,decimal_places=3,null=False)
	LASTHOUR = models.IntegerField(db_column='LASTHOUR',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	DATEID = models.BigIntegerField(db_column='DATEID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 238 ################ Table DESC: XMII_CREDROLESMAP ####################
class XMII_CREDROLESMAP(models.Model):
	CREDROLE = models.CharField(db_column='CREDROLE',max_length=255,null=False)
	CREDTYPE = models.IntegerField(db_column='CREDTYPE',null=False)
	CREDKEY = models.CharField(db_column='CREDKEY',max_length=40,null=False)

	class Meta:
		unique_together = (('CREDKEY','CREDTYPE','CREDROLE',),)


# Position: 239 ################ Table DESC: XMII_CREDSTORE ####################
class XMII_CREDSTORE(models.Model):
	CREDDATA = models.BinaryField(db_column='CREDDATA',max_length=1024*1024,null=True)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	ISPRIVATE = models.IntegerField(db_column='ISPRIVATE',null=False)
	CREDTYPE = models.IntegerField(db_column='CREDTYPE',null=False)
	CREDKEY = models.CharField(db_column='CREDKEY',max_length=40,null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)

	class Meta:
		unique_together = (('CREDKEY','CREDTYPE',),)


# Position: 240 ################ Table DESC: XMII_CSTMATTRIB ####################
class XMII_CSTMATTRIB(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	FIELDTYPE = models.IntegerField(db_column='FIELDTYPE',null=False)
	FIELDSIZE = models.IntegerField(db_column='FIELDSIZE',null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=100,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=150,null=True)
	REQUIRED = models.CharField(db_column='REQUIRED',max_length=1,null=False)
	DEFAULTVALUE = models.CharField(db_column='DEFAULTVALUE',max_length=100,null=True)
	FIELDVALUES = models.CharField(db_column='FIELDVALUES',max_length=1000,null=True)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=100,null=False)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)
	FIELDVALIDATION = models.IntegerField(db_column='FIELDVALIDATION',null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 241 ################ Table DESC: XMII_CSTMATTRIBMAP ####################
class XMII_CSTMATTRIBMAP(models.Model):
	OBJECTTYPE = models.IntegerField(db_column='OBJECTTYPE',null=False)
	OBJECTNAME = models.CharField(db_column='OBJECTNAME',max_length=150,null=False)
	PRIORITY = models.IntegerField(db_column='PRIORITY',null=False)
	ATTRIBUTENAME = models.CharField(db_column='ATTRIBUTENAME',max_length=100,null=False)
	ATTRIBUTEVALUE = models.BinaryField(db_column='ATTRIBUTEVALUE',null=True)

	class Meta:
		unique_together = (('ATTRIBUTENAME','OBJECTTYPE','OBJECTNAME',),)


# Position: 242 ################ Table DESC: XMII_CUSTOM_DATA ####################
class XMII_CUSTOM_DATA(models.Model):
	FILEPATH = models.CharField(db_column='FILEPATH',max_length=300,null=False)
	DATAVALUE = models.BinaryField(db_column='DATAVALUE',null=True)
	DEFID = models.IntegerField(db_column='DEFID',null=False)

	class Meta:
		unique_together = (('FILEPATH','DEFID',),)


# Position: 243 ################ Table DESC: XMII_CUSTOM_DEFS ####################
class XMII_CUSTOM_DEFS(models.Model):
	UIVIEW = models.CharField(db_column='UIVIEW',max_length=200,null=False)
	SOURCEXPATH = models.CharField(db_column='SOURCEXPATH',max_length=150,null=False)
	VALUETYPE = models.CharField(db_column='VALUETYPE',max_length=30,null=False)
	ID = models.IntegerField(db_column='ID',null=False)
	OBJECTCLASS = models.CharField(db_column='OBJECTCLASS',max_length=50,null=False)
	NAME = models.CharField(db_column='NAME',max_length=50,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 244 ################ Table DESC: XMII_CUSTOM_TAG ####################
class XMII_CUSTOM_TAG(models.Model):
	GROUPID = models.BigIntegerField(db_column='GROUPID',null=False)
	TAGNAME = models.CharField(db_column='TAGNAME',max_length=100,null=False)
	CLASSNAME = models.CharField(db_column='CLASSNAME',max_length=100,null=False)

	class Meta:
		unique_together = (('GROUPID','TAGNAME',),)


# Position: 245 ################ Table DESC: XMII_CUSTTAG_GROUP ####################
class XMII_CUSTTAG_GROUP(models.Model):
	NAMESPACE = models.CharField(db_column='NAMESPACE',max_length=100,null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	GROUPNAME = models.CharField(db_column='GROUPNAME',max_length=100,null=False)
	DEPLOYCOMPONENT = models.CharField(db_column='DEPLOYCOMPONENT',max_length=100,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 246 ################ Table DESC: XMII_DEBUGACTIONS ####################
class XMII_DBGACTIONS(models.Model):
	TRXID = models.BigIntegerField(db_column='TRXID',null=False)
	SEQNUM = models.BigIntegerField(db_column='SEQNUM',null=False)
	ACTIONNAME = models.CharField(db_column='ACTIONNAME',max_length=256,null=False)
	ACTIONSTATE = models.IntegerField(db_column='ACTIONSTATE',null=False)
	STAMP = models.BigIntegerField(db_column='STAMP',null=False)

	class Meta:
		unique_together = (('TRXID','SEQNUM',),)


# Position: 247 ################ Table DESC: XMII_DEBUGTRXCMDS ####################
class XMII_DBGCMDS(models.Model):
	STATUS = models.IntegerField(db_column='STATUS',null=False)
	TRXID = models.BigIntegerField(db_column='TRXID',null=False)
	SEQNUM = models.BigIntegerField(db_column='SEQNUM',null=False)
	EXECSTAMP = models.BigIntegerField(db_column='EXECSTAMP',null=False)
	CMDTYPE = models.IntegerField(db_column='CMDTYPE',null=False)
	REQSTAMP = models.BigIntegerField(db_column='REQSTAMP',null=False)
	ATTR2 = models.BinaryField(db_column='ATTR2',null=True)
	ATTR1 = models.BinaryField(db_column='ATTR1',null=True)
	MAINDATA = models.BinaryField(db_column='MAINDATA',null=True)

	class Meta:
		unique_together = (('TRXID','SEQNUM',),)


# Position: 248 ################ Table DESC: XMII_DEBUGLOGS ####################
class XMII_DBGLOGS(models.Model):
	MESSAGE = models.BinaryField(db_column='MESSAGE',null=True)
	TRXID = models.BigIntegerField(db_column='TRXID',null=False)
	SEQNUM = models.BigIntegerField(db_column='SEQNUM',null=False)
	MSGLEVEL = models.IntegerField(db_column='MSGLEVEL',null=False)
	STAMP = models.BigIntegerField(db_column='STAMP',null=False)

	class Meta:
		unique_together = (('TRXID','SEQNUM',),)


# Position: 249 ################ Table DESC: XMII_DEBUGTRX ####################
class XMII_DBGSESSION(models.Model):
	EXPIRATION = models.DateTimeField(db_column='EXPIRATION',null=True)
	LASTSEQNUM = models.BigIntegerField(db_column='LASTSEQNUM',null=False)
	TRXID = models.BigIntegerField(db_column='TRXID',null=False)
	TRXSTATE = models.IntegerField(db_column='TRXSTATE',null=False)
	TRXSTATEDATA = models.BinaryField(db_column='TRXSTATEDATA',max_length=1024*1024,null=True)
	TRXIMAGE = models.BinaryField(db_column='TRXIMAGE',max_length=1024*1024,null=True)
	INPUTPARAMS = models.BinaryField(db_column='INPUTPARAMS',null=True)
	USERNAME = models.BinaryField(db_column='USERNAME',null=True)
	STAMP = models.BigIntegerField(db_column='STAMP',null=False)
	TRXSTART = models.DateTimeField(db_column='TRXSTART',null=True)
	FILEID = models.BigIntegerField(db_column='FILEID',null=False)

	class Meta:
		unique_together = (('TRXID',),)


# Position: 250 ################ Table DESC: XMII_DEBUGSTATUS ####################
class XMII_DBGSTATUS(models.Model):
	MESSAGE = models.BinaryField(db_column='MESSAGE',null=True)
	STATUS = models.IntegerField(db_column='STATUS',null=False)
	EXCEPTIONSOURCE = models.CharField(db_column='EXCEPTIONSOURCE',max_length=256,null=True)
	TRXID = models.BigIntegerField(db_column='TRXID',null=False)
	SEQNUM = models.BigIntegerField(db_column='SEQNUM',null=False)
	STATDATE = models.BigIntegerField(db_column='STATDATE',null=False)
	ACTIONTYPE = models.CharField(db_column='ACTIONTYPE',max_length=256,null=True)
	STAMP = models.BigIntegerField(db_column='STAMP',null=False)
	EXCEPTIONTYPE = models.IntegerField(db_column='EXCEPTIONTYPE',null=False)

	class Meta:
		unique_together = (('TRXID','SEQNUM',),)


# Position: 251 ################ Table DESC: XMII_DEBUGVARS ####################
class XMII_DBGVARS(models.Model):
	TRXID = models.BigIntegerField(db_column='TRXID',null=False)
	SEQNUM = models.BigIntegerField(db_column='SEQNUM',null=False)
	VARNAME = models.CharField(db_column='VARNAME',max_length=256,null=False)
	VARVALUE = models.BinaryField(db_column='VARVALUE',null=True)
	STAMP = models.BigIntegerField(db_column='STAMP',null=False)
	VARTYPE = models.CharField(db_column='VARTYPE',max_length=64,null=False)

	class Meta:
		unique_together = (('TRXID','SEQNUM',),)


# Position: 252 ################ Table DESC: XMII_DB_MEMORY ####################
class XMII_DB_MEMORY(models.Model):
	NAMESPACE = models.CharField(db_column='NAMESPACE',max_length=180,null=False)
	PROJECT = models.CharField(db_column='PROJECT',max_length=100,null=False)
	PROPVALUE = models.BinaryField(db_column='PROPVALUE',max_length=1024*1024,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID','PROJECT','NAMESPACE',),)


# Position: 253 ################ Table DESC: XMII_DEBUGACTIONS ####################
class XMII_DEBUGACTIONS(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 254 ################ Table DESC: XMII_DEBUGLOGS ####################
class XMII_DEBUGLOGS(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 255 ################ Table DESC: XMII_DEBUGSTATUS ####################
class XMII_DEBUGSTATUS(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 256 ################ Table DESC: XMII_DEBUGTRX ####################
class XMII_DEBUGTRX(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 257 ################ Table DESC: XMII_DEBUGTRXCMDS ####################
class XMII_DEBUGTRXCMDS(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 258 ################ Table DESC: XMII_DEBUGVARS ####################
class XMII_DEBUGVARS(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 259 ################ Table DESC: XMII_DEPENDENCIES ####################
class XMII_DEPENDENCIES(models.Model):
	MAJOR = models.IntegerField(db_column='MAJOR',null=False)
	SUBMINOR = models.IntegerField(db_column='SUBMINOR',null=False)
	BUILDNUM = models.IntegerField(db_column='BUILDNUM',null=False)
	COMPONENT = models.CharField(db_column='COMPONENT',max_length=100,null=False)
	MINOR = models.IntegerField(db_column='MINOR',null=False)
	NOTE_NUMBER = models.IntegerField(db_column='NOTE_NUMBER',null=False)




# Position: 260 ################ Table DESC: XMII_ENTITY_ANNOTN ####################
class XMII_ENTITY_ANNOTN(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 261 ################ Table DESC: XMII_ENTITY_ASSOCT ####################
class XMII_ENTITY_ASSOCT(models.Model):
	TO_ENTITY_ID = models.BigIntegerField(db_column='TO_ENTITY_ID',null=False)
	MULTIPLICITY = models.CharField(db_column='MULTIPLICITY',max_length=5,null=False)
	RELATION_TYPE = models.CharField(db_column='RELATION_TYPE',max_length=20,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	FROM_ENTITY_ID = models.BigIntegerField(db_column='FROM_ENTITY_ID',null=False)
	NAME = models.CharField(db_column='NAME',max_length=250,null=False)
	NAVIGATION_NAME = models.CharField(db_column='NAVIGATION_NAME',max_length=250,null=False)

	class Meta:
		unique_together = (('ID','FROM_ENTITY_ID','TO_ENTITY_ID',),)


# Position: 262 ################ Table DESC: XMII_ENTITY_COLUMN ####################
class XMII_ENTITY_COLUMN(models.Model):
	NAME_ALIAS = models.CharField(db_column='NAME_ALIAS',max_length=250,null=False)
	ENTITYID = models.BigIntegerField(db_column='ENTITYID',null=False)
	IS_NULL = models.CharField(db_column='IS_NULL',max_length=5,null=False)
	IS_KEY = models.CharField(db_column='IS_KEY',max_length=5,null=False)
	SQL_TYPE = models.IntegerField(db_column='SQL_TYPE',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	NAME = models.CharField(db_column='NAME',max_length=250,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 263 ################ Table DESC: XMII_ENTITY_DETAIL ####################
class XMII_ENTITY_DETAIL(models.Model):
	CREATED_BY = models.CharField(db_column='CREATED_BY',max_length=250,null=False)
	DATA_SERVER = models.CharField(db_column='DATA_SERVER',max_length=50,null=False)
	CREATED_DATE = models.DateTimeField(db_column='CREATED_DATE',null=True)
	ENTITY_NAME_UP = models.CharField(db_column='ENTITY_NAME_UP',max_length=250,null=False)
	REFERENCE_OBJECT = models.CharField(db_column='REFERENCE_OBJECT',max_length=40,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	ENTITY_NAME = models.CharField(db_column='ENTITY_NAME',max_length=250,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 264 ################ Table DESC: XMII_EN_ASSC_LINKS ####################
class XMII_EN_ASSC_LINKS(models.Model):
	ASSC_ID = models.BigIntegerField(db_column='ASSC_ID',null=False)
	FROM_COL_ID = models.BigIntegerField(db_column='FROM_COL_ID',null=False)
	TO_COL_ID = models.BigIntegerField(db_column='TO_COL_ID',null=False)

	class Meta:
		unique_together = (('ASSC_ID','FROM_COL_ID','TO_COL_ID',),)


# Position: 265 ################ Table DESC: XMII_ETCCATEGORY ####################
class XMII_ETCCATEGORY(models.Model):
	ISDISCRETE = models.CharField(db_column='ISDISCRETE',max_length=1,null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	NAMEUP = models.CharField(db_column='NAMEUP',max_length=50,null=False)
	CREATEDON = models.DateTimeField(db_column='CREATEDON',null=True)
	ETCOBJECTTYPE = models.IntegerField(db_column='ETCOBJECTTYPE',null=False)
	ICONPATH = models.BinaryField(db_column='ICONPATH',null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIEDON = models.DateTimeField(db_column='MODIFIEDON',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	NAME = models.CharField(db_column='NAME',max_length=50,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 266 ################ Table DESC: XMII_ETCCATPSET ####################
class XMII_ETCCATPSET(models.Model):
	PROPERTYSETID = models.BigIntegerField(db_column='PROPERTYSETID',null=False)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=False)

	class Meta:
		unique_together = (('CATEGORYID','PROPERTYSETID',),)


# Position: 267 ################ Table DESC: XMII_ETCPROPERTIES ####################
class XMII_ETCPROPERTIES(models.Model):
	PROPERTYNAME = models.CharField(db_column='PROPERTYNAME',max_length=50,null=False)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	CREATEDON = models.DateTimeField(db_column='CREATEDON',null=True)
	PROPERTYSETID = models.BigIntegerField(db_column='PROPERTYSETID',null=False)
	PROPERTYDATATYPE = models.IntegerField(db_column='PROPERTYDATATYPE',null=False)
	PROPERTYNAMEALIAS = models.CharField(db_column='PROPERTYNAMEALIAS',max_length=18,null=True)
	PROPERTYVALUE = models.BinaryField(db_column='PROPERTYVALUE',max_length=1024*1024,null=True)
	MODIFIEDON = models.DateTimeField(db_column='MODIFIEDON',null=True)
	ANALYSISRELEVANT = models.CharField(db_column='ANALYSISRELEVANT',max_length=1,null=True)
	ALIASNAMEUP = models.CharField(db_column='ALIASNAMEUP',max_length=50,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	ALIASNAME = models.CharField(db_column='ALIASNAME',max_length=50,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	PROPERTYNAMEUP = models.CharField(db_column='PROPERTYNAMEUP',max_length=50,null=False)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 268 ################ Table DESC: XMII_ETCPROPSETS ####################
class XMII_ETCPROPSETS(models.Model):
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	NAMEUP = models.CharField(db_column='NAMEUP',max_length=100,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	CREATEDON = models.DateTimeField(db_column='CREATEDON',null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIEDON = models.DateTimeField(db_column='MODIFIEDON',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 269 ################ Table DESC: XMII_FILES ####################
class XMII_FILES(models.Model):
	FILESIZE = models.BigIntegerField(db_column='FILESIZE',null=True)
	ISDELETE = models.IntegerField(db_column='ISDELETE',null=False)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=75,null=True)
	TEXT = models.BinaryField(db_column='TEXT',max_length=1024*1024,null=True)
	CHECKEDOUTBY = models.CharField(db_column='CHECKEDOUTBY',max_length=75,null=True)
	REMOTEPATH = models.CharField(db_column='REMOTEPATH',max_length=255,null=True)
	NAME = models.CharField(db_column='NAME',max_length=200,null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	STATUS = models.CharField(db_column='STATUS',max_length=50,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	VERSION = models.CharField(db_column='VERSION',max_length=200,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=75,null=True)
	RESOURCEID = models.CharField(db_column='RESOURCEID',max_length=100,null=True)
	PATHID = models.BigIntegerField(db_column='PATHID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 270 ################ Table DESC: XMII_FILESTATS ####################
class XMII_FILESTATS(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 271 ################ Table DESC: XMII_FILE_LOCK ####################
class XMII_FILE_LOCK(models.Model):
	USERNAME = models.CharField(db_column='USERNAME',max_length=75,null=True)
	FILEID = models.BigIntegerField(db_column='FILEID',null=False)
	IS_WEBIDE = models.IntegerField(db_column='IS_WEBIDE',null=False)

	class Meta:
		unique_together = (('FILEID',),)


# Position: 272 ################ Table DESC: XMII_GLOBALS ####################
class XMII_GLOBALS(models.Model):
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=250,null=True)
	MAXRANGE = models.FloatField(db_column='MAXRANGE',null=False)
	MINRANGE = models.FloatField(db_column='MINRANGE',null=False)
	XSDURL = models.CharField(db_column='XSDURL',max_length=100,null=False)
	ROWTYPE = models.CharField(db_column='ROWTYPE',max_length=100,null=True)
	ROWVALUE = models.BinaryField(db_column='ROWVALUE',null=True)
	READONLY = models.CharField(db_column='READONLY',max_length=1,null=False)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 273 ################ Table DESC: XMII_HELPLINKS ####################
class XMII_HELPLINKS(models.Model):
	LINKVALUE = models.CharField(db_column='LINKVALUE',max_length=256,null=False)
	KEYNAME = models.CharField(db_column='KEYNAME',max_length=64,null=False)

	class Meta:
		unique_together = (('KEYNAME',),)


# Position: 274 ################ Table DESC: XMII_USEINDEX ####################
class XMII_INDEXING(models.Model):
	INDEXVALUE = models.CharField(db_column='INDEXVALUE',max_length=300,null=False)
	REFNAME = models.CharField(db_column='REFNAME',max_length=200,null=True)
	REFPATH = models.CharField(db_column='REFPATH',max_length=300,null=True)
	INDEXTYPE = models.IntegerField(db_column='INDEXTYPE',null=False)
	FILEID = models.BigIntegerField(db_column='FILEID',null=False)
	DETAIL = models.BinaryField(db_column='DETAIL',null=True)

	class Meta:
		unique_together = (('INDEXTYPE','INDEXVALUE','FILEID',),)


# Position: 275 ################ Table DESC: XMII_INIT ####################
class XMII_INIT(models.Model):
	PROP_VALUE = models.CharField(db_column='PROP_VALUE',max_length=100,null=False)
	PROP_NAME = models.CharField(db_column='PROP_NAME',max_length=30,null=False)

	class Meta:
		unique_together = (('PROP_NAME',),)


# Position: 276 ################ Table DESC: XMII_JCOMESSAGES ####################
class XMII_JCOMESSAGES(models.Model):
	MESSAGEID = models.BigIntegerField(db_column='MESSAGEID',null=False)
	RECEIVEDDATETIME = models.DateTimeField(db_column='RECEIVEDDATETIME',null=False)
	PROCESSINGDATETIME = models.DateTimeField(db_column='PROCESSINGDATETIME',null=True)
	FLAGGED = models.CharField(db_column='FLAGGED',max_length=10,null=True)
	MESSAGENAME = models.CharField(db_column='MESSAGENAME',max_length=100,null=False)
	PACKETID = models.BigIntegerField(db_column='PACKETID',null=True)
	MESSAGEUID = models.CharField(db_column='MESSAGEUID',max_length=256,null=True)
	STATUS = models.IntegerField(db_column='STATUS',null=False)
	MESSAGETYPE = models.IntegerField(db_column='MESSAGETYPE',null=False)
	DOCNUMBER = models.CharField(db_column='DOCNUMBER',max_length=100,null=True)
	CATEGORY = models.CharField(db_column='CATEGORY',max_length=60,null=True)
	SERVER = models.CharField(db_column='SERVER',max_length=100,null=True)
	DOCXML = models.BinaryField(db_column='DOCXML',null=True)
	MESSAGENUMBER = models.IntegerField(db_column='MESSAGENUMBER',null=True)
	JCOSERVERID = models.BigIntegerField(db_column='JCOSERVERID',null=False)
	STATUSTEXT = models.BinaryField(db_column='STATUSTEXT',null=True)

	class Meta:
		unique_together = (('MESSAGEID',),)


# Position: 277 ################ Table DESC: XMII_JCOMSGCAT ####################
class XMII_JCOMSGCAT(models.Model):
	CREATEDDATE = models.DateTimeField(db_column='CREATEDDATE',null=True)
	STATUS = models.IntegerField(db_column='STATUS',null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=200,null=True)
	CATEGORY = models.CharField(db_column='CATEGORY',max_length=60,null=False)
	CATEGORYTYPE = models.IntegerField(db_column='CATEGORYTYPE',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=75,null=True)

	class Meta:
		unique_together = (('CATEGORY',),)


# Position: 278 ################ Table DESC: XMII_JCOMSGCLEANUP ####################
class XMII_JCOMSGCLEANUP(models.Model):
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	MESSAGENAME = models.CharField(db_column='MESSAGENAME',max_length=100,null=False)
	NAME = models.CharField(db_column='NAME',max_length=60,null=False)
	OLDERBY = models.BigIntegerField(db_column='OLDERBY',null=False)
	STATUS = models.IntegerField(db_column='STATUS',null=True)
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	RUNINTERVAL = models.BigIntegerField(db_column='RUNINTERVAL',null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=100,null=True)
	MESSAGETYPE = models.IntegerField(db_column='MESSAGETYPE',null=False)
	ENABLED = models.CharField(db_column='ENABLED',max_length=1,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=False)
	JCOSERVERID = models.BigIntegerField(db_column='JCOSERVERID',null=False)

	class Meta:
		unique_together = (('ID','JCOSERVERID','MESSAGETYPE','MESSAGENAME',),)


# Position: 279 ################ Table DESC: XMII_JCOPROCRULES ####################
class XMII_JCOPROCRULES(models.Model):
	TRANSACTIONNAME = models.CharField(db_column='TRANSACTIONNAME',max_length=250,null=True)
	MSGNAME = models.CharField(db_column='MSGNAME',max_length=100,null=False)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	PERSISTENCE = models.CharField(db_column='PERSISTENCE',max_length=20,null=True)
	MSGTYPE = models.IntegerField(db_column='MSGTYPE',null=False)
	MODIFIEDDATE = models.DateTimeField(db_column='MODIFIEDDATE',null=True)
	CREATEDDATE = models.DateTimeField(db_column='CREATEDDATE',null=True)
	RULENAME = models.CharField(db_column='RULENAME',max_length=60,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=100,null=True)
	CATEGORY = models.CharField(db_column='CATEGORY',max_length=100,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=False)
	LOGLEVEL = models.CharField(db_column='LOGLEVEL',max_length=20,null=False)
	JCOSERVERID = models.BigIntegerField(db_column='JCOSERVERID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 280 ################ Table DESC: XMII_JCORULEPROP ####################
class XMII_JCORULEPROP(models.Model):
	PROCRULEID = models.BigIntegerField(db_column='PROCRULEID',null=False)
	PROPVALUE = models.CharField(db_column='PROPVALUE',max_length=200,null=True)
	PROPTYPE = models.IntegerField(db_column='PROPTYPE',null=True)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=50,null=False)

	class Meta:
		unique_together = (('PROCRULEID','PROPNAME',),)


# Position: 281 ################ Table DESC: XMII_JCOSERVER ####################
class XMII_JCOSERVER(models.Model):
	SAPSERVER = models.CharField(db_column='SAPSERVER',max_length=20,null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	PROGRAMID = models.CharField(db_column='PROGRAMID',max_length=100,null=True)
	MESSAGENAME = models.CharField(db_column='MESSAGENAME',max_length=20,null=False)
	DIRECTION = models.CharField(db_column='DIRECTION',max_length=25,null=True)
	ALLOWPARAPROCESS = models.CharField(db_column='ALLOWPARAPROCESS',max_length=10,null=True)
	NOOFMESSAGES = models.CharField(db_column='NOOFMESSAGES',max_length=20,null=True)
	NAME = models.CharField(db_column='NAME',max_length=60,null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=100,null=True)
	USELEGACYFORMAT = models.CharField(db_column='USELEGACYFORMAT',max_length=1,null=False)
	SAPCLIENT = models.CharField(db_column='SAPCLIENT',max_length=3,null=True)
	ENABLED = models.CharField(db_column='ENABLED',max_length=1,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=False)
	SERVERTYPE = models.IntegerField(db_column='SERVERTYPE',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 282 ################ Table DESC: XMII_JDBCDRIVERS ####################
class XMII_JDBCDRIVERS(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	CONTENT = models.BinaryField(db_column='CONTENT',max_length=1024*1024,null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=False)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 283 ################ Table DESC: XMII_JOBHISTORY ####################
class XMII_JOBHISTORY(models.Model):
	SYSTEM = models.CharField(db_column='SYSTEM',max_length=100,null=False)
	STATUS = models.IntegerField(db_column='STATUS',null=False)
	RUNTIME = models.DateTimeField(db_column='RUNTIME',null=False)
	PLANNED_EXEC_TIME = models.DateTimeField(db_column='PLANNED_EXEC_TIME',null=True)
	TEXT = models.BinaryField(db_column='TEXT',null=True)
	THREAD_NAME = models.CharField(db_column='THREAD_NAME',max_length=1000,null=True)
	DURATION = models.BigIntegerField(db_column='DURATION',null=False)
	JOBID = models.BigIntegerField(db_column='JOBID',null=False)

	class Meta:
		unique_together = (('JOBID','RUNTIME',),)


# Position: 284 ################ Table DESC: XMII_JOBPROP ####################
class XMII_JOBPROP(models.Model):
	PROPVALUE = models.BinaryField(db_column='PROPVALUE',null=True)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=50,null=False)
	JOBID = models.BigIntegerField(db_column='JOBID',null=False)

	class Meta:
		unique_together = (('JOBID','PROPNAME',),)


# Position: 285 ################ Table DESC: XMII_JOBS ####################
class XMII_JOBS(models.Model):
	SYSTEM = models.CharField(db_column='SYSTEM',max_length=100,null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	NEXTRUNTIME = models.DateTimeField(db_column='NEXTRUNTIME',null=True)
	FILEID = models.BigIntegerField(db_column='FILEID',null=False)
	THREAD_NAME = models.CharField(db_column='THREAD_NAME',max_length=1000,null=True)
	NAME = models.CharField(db_column='NAME',max_length=50,null=False)
	STATUS = models.IntegerField(db_column='STATUS',null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	PATTERN = models.CharField(db_column='PATTERN',max_length=100,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=200,null=True)
	LASTRUNTIME = models.DateTimeField(db_column='LASTRUNTIME',null=True)
	ENABLED = models.CharField(db_column='ENABLED',max_length=1,null=False)
	WORKERCLASSNAME = models.CharField(db_column='WORKERCLASSNAME',max_length=200,null=False)
	FILEPATH = models.CharField(db_column='FILEPATH',max_length=500,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 286 ################ Table DESC: XMII_KPIGROUPFIELD ####################
class XMII_KPIGROUPFIELD(models.Model):
	FULL_KPI_PATH = models.CharField(db_column='FULL_KPI_PATH',max_length=501,null=False)
	AGGTYPE = models.IntegerField(db_column='AGGTYPE',null=True)
	KPIID = models.BigIntegerField(db_column='KPIID',null=False)
	BNAME = models.CharField(db_column='BNAME',max_length=50,null=False)
	FNAME = models.CharField(db_column='FNAME',max_length=8,null=False)

	class Meta:
		unique_together = (('KPIID','FNAME',),)


# Position: 287 ################ Table DESC: None ####################
class XMII_KPI_CHILDREN(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 288 ################ Table DESC: XMII_KPI_DIMENSION ####################
class XMII_KPI_DIMENSION(models.Model):
	SEARCHTEMPLATEID = models.BigIntegerField(db_column='SEARCHTEMPLATEID',null=False)
	KPIID = models.BigIntegerField(db_column='KPIID',null=False)
	DIMENSIONNAME = models.CharField(db_column='DIMENSIONNAME',max_length=50,null=False)
	DIMENSIONVALUE = models.CharField(db_column='DIMENSIONVALUE',max_length=50,null=True)
	KPIHIERARCHY = models.CharField(db_column='KPIHIERARCHY',max_length=255,null=False)

	class Meta:
		unique_together = (('SEARCHTEMPLATEID','KPIID','KPIHIERARCHY','DIMENSIONNAME',),)


# Position: 289 ################ Table DESC: XMII_KPI_HIERARCHY ####################
class XMII_KPI_HIERARCHY(models.Model):
	SEARCHTEMPLATEID = models.BigIntegerField(db_column='SEARCHTEMPLATEID',null=False)
	MODE = models.IntegerField(db_column='MODE',null=False)
	PARENTKPIID = models.BigIntegerField(db_column='PARENTKPIID',null=False)
	KPIPATH = models.CharField(db_column='KPIPATH',max_length=255,null=False)
	KPIID = models.BigIntegerField(db_column='KPIID',null=False)
	KPIHIERARCHY = models.CharField(db_column='KPIHIERARCHY',max_length=255,null=False)

	class Meta:
		unique_together = (('SEARCHTEMPLATEID','KPIID','PARENTKPIID','KPIHIERARCHY',),)


# Position: 290 ################ Table DESC: XMII_KPI_HOURS ####################
class XMII_KPI_HOURS(models.Model):
	KPI_WEEK = models.IntegerField(db_column='KPI_WEEK',null=True)
	TIMESTRING = models.CharField(db_column='TIMESTRING',max_length=8,null=False)
	KPI_DAY = models.IntegerField(db_column='KPI_DAY',null=True)
	KPI_HOUR = models.IntegerField(db_column='KPI_HOUR',null=True)
	KPI_QUARTER = models.CharField(db_column='KPI_QUARTER',max_length=2,null=True)
	KPI_YEAR = models.IntegerField(db_column='KPI_YEAR',null=True)
	KPI_MONTH = models.IntegerField(db_column='KPI_MONTH',null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 291 ################ Table DESC: XMII_KPI_MINUTES ####################
class XMII_KPI_MINUTES(models.Model):
	KPI_5MINUTE = models.IntegerField(db_column='KPI_5MINUTE',null=False)
	KPI_10MINUTE = models.IntegerField(db_column='KPI_10MINUTE',null=False)
	KPI_20MINUTE = models.IntegerField(db_column='KPI_20MINUTE',null=False)
	KPI_30MINUTE = models.IntegerField(db_column='KPI_30MINUTE',null=False)
	KPI_MINUTE = models.IntegerField(db_column='KPI_MINUTE',null=False)
	KPI_15MINUTE = models.IntegerField(db_column='KPI_15MINUTE',null=False)

	class Meta:
		unique_together = (('KPI_MINUTE','KPI_5MINUTE','KPI_10MINUTE','KPI_15MINUTE','KPI_20MINUTE','KPI_30MINUTE',),)


# Position: 292 ################ Table DESC: XMII_KPI_RELATIONS ####################
class XMII_KPI_RELATIONS(models.Model):
	CHILDKPINAME = models.CharField(db_column='CHILDKPINAME',max_length=500,null=False)
	CHILDKPIID = models.BigIntegerField(db_column='CHILDKPIID',null=False)
	KPIID = models.BigIntegerField(db_column='KPIID',null=False)
	KPINAME = models.CharField(db_column='KPINAME',max_length=500,null=False)

	class Meta:
		unique_together = (('KPIID','CHILDKPIID',),)


# Position: 293 ################ Table DESC: XMII_KPI_ROLES ####################
class XMII_KPI_ROLES(models.Model):
	ASSIGNEDROLE = models.CharField(db_column='ASSIGNEDROLE',max_length=200,null=False)
	MODE = models.IntegerField(db_column='MODE',null=False)
	KPINAME = models.CharField(db_column='KPINAME',max_length=500,null=False)




# Position: 294 ################ Table DESC: XMII_KPI_TBS ####################
class XMII_KPI_TBS(models.Model):
	TAG_KPI_TABLE_ACT = models.CharField(db_column='TAG_KPI_TABLE_ACT',max_length=18,null=True)
	UOM = models.CharField(db_column='UOM',max_length=50,null=True)
	TIMEZONEID = models.CharField(db_column='TIMEZONEID',max_length=40,null=True)
	FULL_KPI_PATH = models.CharField(db_column='FULL_KPI_PATH',max_length=501,null=False)
	TIMEZONE_OFFSET = models.IntegerField(db_column='TIMEZONE_OFFSET',null=True)
	GEN_TABLE_NAME = models.CharField(db_column='GEN_TABLE_NAME',max_length=17,null=False)
	FILEID = models.BigIntegerField(db_column='FILEID',null=False)

	class Meta:
		unique_together = (('FILEID',),)


# Position: 295 ################ Table DESC: XMII_LANGUAGES ####################
class XMII_LANGUAGES(models.Model):
	LOCALE = models.CharField(db_column='LOCALE',max_length=2,null=False)

	class Meta:
		unique_together = (('LOCALE',),)


# Position: 296 ################ Table DESC: XMII_LICENSEUSAGE ####################
class XMII_LICENSEUSAGE(models.Model):
	UNIQUEUSERS = models.IntegerField(db_column='UNIQUEUSERS',null=False)
	TOTALLOGINS = models.IntegerField(db_column='TOTALLOGINS',null=False)
	ENTRYDATE = models.DateField(db_column='ENTRYDATE',null=False)
	ACTIVEUSERS = models.IntegerField(db_column='ACTIVEUSERS',null=False)
	SERVERNAME = models.CharField(db_column='SERVERNAME',max_length=100,null=False)

	class Meta:
		unique_together = (('ENTRYDATE','SERVERNAME',),)


# Position: 297 ################ Table DESC: XMII_LOCALIZATION ####################
class XMII_LOCALIZATION(models.Model):
	LOCALE = models.CharField(db_column='LOCALE',max_length=5,null=False)
	KEYNAME = models.CharField(db_column='KEYNAME',max_length=255,null=False)
	TEXTVALUE = models.CharField(db_column='TEXTVALUE',max_length=200,null=True)

	class Meta:
		unique_together = (('KEYNAME','LOCALE',),)


# Position: 298 ################ Table DESC: XMII_MDO_LOGS ####################
class XMII_MDO_LOGS(models.Model):
	LOGENTRY = models.BinaryField(db_column='LOGENTRY',null=True)
	TASKID = models.CharField(db_column='TASKID',max_length=200,null=True)
	MSGLEVEL = models.IntegerField(db_column='MSGLEVEL',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	STAMP = models.DateTimeField(db_column='STAMP',null=False)
	FILEID = models.BigIntegerField(db_column='FILEID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 299 ################ Table DESC: XMII_MDO_TASKS ####################
class XMII_MDO_TASKS(models.Model):
	TASKID = models.CharField(db_column='TASKID',max_length=100,null=False)
	MSGLEVEL = models.IntegerField(db_column='MSGLEVEL',null=False)
	STAMP = models.DateTimeField(db_column='STAMP',null=False)
	FILEID = models.BigIntegerField(db_column='FILEID',null=False)

	class Meta:
		unique_together = (('TASKID',),)


# Position: 300 ################ Table DESC: XMII_NODEADMIN_ACT ####################
class XMII_NODEADMIN_ACT(models.Model):
	NODE_ID = models.BigIntegerField(db_column='NODE_ID',null=True)
	ISINHERITED = models.CharField(db_column='ISINHERITED',max_length=1,null=True)
	ADMIN_GROUP = models.CharField(db_column='ADMIN_GROUP',max_length=500,null=True)




# Position: 301 ################ Table DESC: XMII_NODE_ADMIN ####################
class XMII_NODE_ADMIN(models.Model):
	NODE_ID = models.BigIntegerField(db_column='NODE_ID',null=False)
	ISINHERITED = models.CharField(db_column='ISINHERITED',max_length=10,null=False)
	ADMIN_GROUP = models.CharField(db_column='ADMIN_GROUP',max_length=500,null=True)




# Position: 302 ################ Table DESC: XMII_NODE_ADMIN_TP ####################
class XMII_NODE_ADMIN_TP(models.Model):
	NODE_ID = models.BigIntegerField(db_column='NODE_ID',null=True)
	ISINHERITED = models.CharField(db_column='ISINHERITED',max_length=1,null=True)
	ADMIN_GROUP = models.CharField(db_column='ADMIN_GROUP',max_length=500,null=True)




# Position: 303 ################ Table DESC: XMII_NOTIFIC_CONF ####################
class XMII_NOTIFIC_CONF(models.Model):
	PCOTRIGGEREXPVALUE = models.BinaryField(db_column='PCOTRIGGEREXPVALUE',null=True)
	ISFIXEDMSG = models.CharField(db_column='ISFIXEDMSG',max_length=1,null=False)
	TRIGGEREXP = models.BinaryField(db_column='TRIGGEREXP',null=True)
	MAXRETRYATTEMPTS = models.IntegerField(db_column='MAXRETRYATTEMPTS',null=True)
	STATUS = models.CharField(db_column='STATUS',max_length=100,null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	TRIGGEREXPTYPE = models.IntegerField(db_column='TRIGGEREXPTYPE',null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	RETRYINTERVAL = models.IntegerField(db_column='RETRYINTERVAL',null=True)
	JPAVERSION = models.BigIntegerField(db_column='JPAVERSION',null=False)
	LIFETIMEHRS = models.IntegerField(db_column='LIFETIMEHRS',null=True)
	DELETEMSGAFTERTIME = models.IntegerField(db_column='DELETEMSGAFTERTIME',null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=False)
	NOTIFICATIONTYPE = models.CharField(db_column='NOTIFICATIONTYPE',max_length=10,null=False)
	ISDIRTY = models.CharField(db_column='ISDIRTY',max_length=1,null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	NUMOFMESSAGES = models.IntegerField(db_column='NUMOFMESSAGES',null=True)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)
	LIFETIMEMINS = models.IntegerField(db_column='LIFETIMEMINS',null=True)
	ISACCUMULATING = models.CharField(db_column='ISACCUMULATING',max_length=1,null=False)
	NAMEUP = models.CharField(db_column='NAMEUP',max_length=100,null=False)
	LIFETIMEDAYS = models.IntegerField(db_column='LIFETIMEDAYS',null=True)
	VERSION = models.IntegerField(db_column='VERSION',null=False)
	PCODATASERVER = models.CharField(db_column='PCODATASERVER',max_length=150,null=False)
	FAILEDPERSISTANCE = models.IntegerField(db_column='FAILEDPERSISTANCE',null=True)
	ENABLETRIGGEREXP = models.CharField(db_column='ENABLETRIGGEREXP',max_length=1,null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	MAXACCUMTIME = models.IntegerField(db_column='MAXACCUMTIME',null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 304 ################ Table DESC: XMII_NOTI_COMMVARS ####################
class XMII_NOTI_COMMVARS(models.Model):
	PARAMNAME = models.CharField(db_column='PARAMNAME',max_length=100,null=False)
	DATATYPE = models.CharField(db_column='DATATYPE',max_length=50,null=True)
	NID = models.BigIntegerField(db_column='NID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	PARAMVALUE = models.CharField(db_column='PARAMVALUE',max_length=999,null=True)
	PCOVALUE = models.CharField(db_column='PCOVALUE',max_length=999,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 305 ################ Table DESC: XMII_NOTI_DESTINFO ####################
class XMII_NOTI_DESTINFO(models.Model):
	PARAMNAME = models.CharField(db_column='PARAMNAME',max_length=100,null=False)
	DATATYPE = models.CharField(db_column='DATATYPE',max_length=50,null=True)
	OBJECTTYPE = models.IntegerField(db_column='OBJECTTYPE',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	PARAMVALUE = models.CharField(db_column='PARAMVALUE',max_length=999,null=True)
	PCOVALUE = models.CharField(db_column='PCOVALUE',max_length=999,null=True)
	DID = models.BigIntegerField(db_column='DID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 306 ################ Table DESC: XMII_NOTI_DTRX ####################
class XMII_NOTI_DTRX(models.Model):
	DTRXNAME = models.CharField(db_column='DTRXNAME',max_length=500,null=True)
	DTRXUSEASYNCMSG = models.CharField(db_column='DTRXUSEASYNCMSG',max_length=1,null=True)
	DTRXINPUTPARAMNAME = models.CharField(db_column='DTRXINPUTPARAMNAME',max_length=100,null=True)
	DTRXPERSISTANCELVL = models.IntegerField(db_column='DTRXPERSISTANCELVL',null=True)
	NID = models.BigIntegerField(db_column='NID',null=False)
	DESTSYSTEMNAME = models.CharField(db_column='DESTSYSTEMNAME',max_length=50,null=False)
	DESTNAME = models.CharField(db_column='DESTNAME',max_length=50,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	DESTTYPE = models.CharField(db_column='DESTTYPE',max_length=50,null=True)
	DESTDESC = models.CharField(db_column='DESTDESC',max_length=255,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 307 ################ Table DESC: XMII_NOTI_ID_GEN ####################
class XMII_NOTI_ID_GEN(models.Model):
	GEN_KEY = models.CharField(db_column='GEN_KEY',max_length=100,null=False)
	GEN_VALUE = models.BigIntegerField(db_column='GEN_VALUE',null=False)

	class Meta:
		unique_together = (('GEN_KEY',),)


# Position: 308 ################ Table DESC: XMII_NOTI_LCLIZATN ####################
class XMII_NOTI_LCLIZATN(models.Model):
	LOCALE = models.CharField(db_column='LOCALE',max_length=10,null=False)
	LCLZVALUE = models.CharField(db_column='LCLZVALUE',max_length=255,null=False)
	NID = models.BigIntegerField(db_column='NID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 309 ################ Table DESC: XMII_NOTI_OUTCNTXT ####################
class XMII_NOTI_OUTCNTXT(models.Model):
	ISDIRTY = models.CharField(db_column='ISDIRTY',max_length=1,null=True)
	DATATYPE = models.CharField(db_column='DATATYPE',max_length=50,null=False)
	NEID = models.BigIntegerField(db_column='NEID',null=False)
	PCOCNTXTVALUE = models.CharField(db_column='PCOCNTXTVALUE',max_length=999,null=True)
	CNTXTVALUE = models.BinaryField(db_column='CNTXTVALUE',null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	CNTXTNAME = models.CharField(db_column='CNTXTNAME',max_length=50,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 310 ################ Table DESC: XMII_NOTI_OUTEXPR ####################
class XMII_NOTI_OUTEXPR(models.Model):
	ENAME = models.CharField(db_column='ENAME',max_length=50,null=False)
	ISDIRTY = models.CharField(db_column='ISDIRTY',max_length=1,null=True)
	PCOEXPVALUE = models.BinaryField(db_column='PCOEXPVALUE',null=True)
	NID = models.BigIntegerField(db_column='NID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	EXPRESSION = models.BinaryField(db_column='EXPRESSION',null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 311 ################ Table DESC: XMII_NOTI_PROPSETS ####################
class XMII_NOTI_PROPSETS(models.Model):
	ISDIRTY = models.CharField(db_column='ISDIRTY',max_length=1,null=True)
	NID = models.BigIntegerField(db_column='NID',null=False)
	PROPSETNAME = models.CharField(db_column='PROPSETNAME',max_length=100,null=True)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=100,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	PICNAMESPACE = models.CharField(db_column='PICNAMESPACE',max_length=999,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 312 ################ Table DESC: XMII_NOTI_SUB_ITEM ####################
class XMII_NOTI_SUB_ITEM(models.Model):
	TAGALIAS = models.CharField(db_column='TAGALIAS',max_length=100,null=True)
	ISDIRTY = models.CharField(db_column='ISDIRTY',max_length=1,null=True)
	PICTAGNAMESPACE = models.CharField(db_column='PICTAGNAMESPACE',max_length=999,null=False)
	NID = models.BigIntegerField(db_column='NID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	PCOTAGNAMESPACE = models.CharField(db_column='PCOTAGNAMESPACE',max_length=400,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 313 ################ Table DESC: XMII_NOTI_VERS_GEN ####################
class XMII_NOTI_VERS_GEN(models.Model):
	GEN_KEY = models.CharField(db_column='GEN_KEY',max_length=100,null=False)
	GEN_VALUE = models.BigIntegerField(db_column='GEN_VALUE',null=False)

	class Meta:
		unique_together = (('GEN_KEY',),)


# Position: 314 ################ Table DESC: XMII_NWDICONFIG ####################
class XMII_NWDICONFIG(models.Model):
	PROPVALUE = models.CharField(db_column='PROPVALUE',max_length=255,null=True)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=255,null=False)

	class Meta:
		unique_together = (('PROPNAME',),)


# Position: 315 ################ Table DESC: None ####################
class XMII_OBJECT_LOCK(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	SESSIONID = models.CharField(db_column='SESSIONID',max_length=300,null=False)
	OBJECTTYPE = models.CharField(db_column='OBJECTTYPE',max_length=100,null=False)
	LOCKEDBY = models.CharField(db_column='LOCKEDBY',max_length=100,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	NAME = models.CharField(db_column='NAME',max_length=200,null=True)

	class Meta:
		unique_together = (('ID','OBJECTTYPE',),)


# Position: 316 ################ Table DESC: XMII_PATHS ####################
class XMII_PATHS(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	STATUS = models.CharField(db_column='STATUS',max_length=50,null=True)
	PARENTID = models.BigIntegerField(db_column='PARENTID',null=False)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=75,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	CHECKEDOUTBY = models.CharField(db_column='CHECKEDOUTBY',max_length=75,null=True)
	FULLPATH = models.CharField(db_column='FULLPATH',max_length=300,null=True)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	REMOTEPATH = models.CharField(db_column='REMOTEPATH',max_length=255,null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=75,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 317 ################ Table DESC: XMII_PDF_FONTS ####################
class XMII_PDF_FONTS(models.Model):
	FONTFILE = models.BinaryField(db_column='FONTFILE',max_length=1024*1024,null=True)
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	FONTNAME = models.CharField(db_column='FONTNAME',max_length=100,null=False)
	ENCODING = models.CharField(db_column='ENCODING',max_length=100,null=False)
	EMBEDDED = models.CharField(db_column='EMBEDDED',max_length=1,null=False)
	CONFIGNAME = models.CharField(db_column='CONFIGNAME',max_length=100,null=False)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=False)




# Position: 318 ################ Table DESC: XMII_PE_COL ####################
class XMII_PE_COL(models.Model):
	PEINFOID = models.BigIntegerField(db_column='PEINFOID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MDOCOLUMNNAME = models.CharField(db_column='MDOCOLUMNNAME',max_length=50,null=False)
	COLUMNID = models.BigIntegerField(db_column='COLUMNID',null=False)
	ISWEIGHT = models.CharField(db_column='ISWEIGHT',max_length=1,null=True)
	ANALYSISRELEVANT = models.BinaryField(db_column='ANALYSISRELEVANT',null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 319 ################ Table DESC: XMII_PE_COL_DEFINE ####################
class XMII_PE_COL_DEFINE(models.Model):
	COLUMNTYPE = models.IntegerField(db_column='COLUMNTYPE',null=True)
	MAPPINGPROPERTY = models.CharField(db_column='MAPPINGPROPERTY',max_length=50,null=True)
	TARGETCOLUMN = models.CharField(db_column='TARGETCOLUMN',max_length=50,null=False)
	TARGETTABLE = models.CharField(db_column='TARGETTABLE',max_length=50,null=False)
	ANALYSISRELEVANT = models.CharField(db_column='ANALYSISRELEVANT',max_length=1,null=True)
	DATATYPE = models.IntegerField(db_column='DATATYPE',null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=50,null=True)
	TEMPLATEID = models.BigIntegerField(db_column='TEMPLATEID',null=True)
	COLUMNNAME = models.CharField(db_column='COLUMNNAME',max_length=50,null=False)
	CUSTTABLEID = models.BigIntegerField(db_column='CUSTTABLEID',null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	JOINCONDITION = models.CharField(db_column='JOINCONDITION',max_length=255,null=True)
	ISWEIGHT = models.CharField(db_column='ISWEIGHT',max_length=1,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 320 ################ Table DESC: XMII_PE_INF ####################
class XMII_PE_INF(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	TABLENAME = models.CharField(db_column='TABLENAME',max_length=100,null=False)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	TEMPLATEID = models.BigIntegerField(db_column='TEMPLATEID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	SERVERNAME = models.CharField(db_column='SERVERNAME',max_length=50,null=False)
	NAME = models.CharField(db_column='NAME',max_length=30,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 321 ################ Table DESC: XMII_PE_TMPLTS ####################
class XMII_PE_TMPLTS(models.Model):
	TMPLTTYPE = models.CharField(db_column='TMPLTTYPE',max_length=50,null=True)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=225,null=True)
	LOCKEDBY = models.CharField(db_column='LOCKEDBY',max_length=50,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 322 ################ Table DESC: XMII_PIC_JRA_CONN ####################
class XMII_PIC_JRA_CONN(models.Model):
	SAPSERVER = models.CharField(db_column='SAPSERVER',max_length=20,null=True)
	ISCURRENT = models.CharField(db_column='ISCURRENT',max_length=1,null=False)
	JRA_ID = models.BigIntegerField(db_column='JRA_ID',null=False)
	SAPCLIENT = models.CharField(db_column='SAPCLIENT',max_length=3,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 323 ################ Table DESC: XMII_PROFILES ####################
class XMII_PROFILES(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	XMLDATA = models.BinaryField(db_column='XMLDATA',max_length=1024*1024,null=True)
	PROFILETYPE = models.CharField(db_column='PROFILETYPE',max_length=4,null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	NAME = models.CharField(db_column='NAME',max_length=256,null=False)

	class Meta:
		unique_together = (('PROFILETYPE','NAME',),)


# Position: 324 ################ Table DESC: XMII_PROJECTPRMMAP ####################
class XMII_PROJECTPRMMAP(models.Model):
	ROLE_NAME = models.CharField(db_column='ROLE_NAME',max_length=256,null=False)
	PROJECT_NAME = models.CharField(db_column='PROJECT_NAME',max_length=100,null=False)

	class Meta:
		unique_together = (('PROJECT_NAME','ROLE_NAME',),)


# Position: 325 ################ Table DESC: XMII_PROJECTS ####################
class XMII_PROJECTS(models.Model):
	SYSTEM = models.CharField(db_column='SYSTEM',max_length=1,null=False)
	DCNAME = models.CharField(db_column='DCNAME',max_length=100,null=True)
	DCVENDOR = models.CharField(db_column='DCVENDOR',max_length=50,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=200,null=True)
	MONITORING = models.CharField(db_column='MONITORING',max_length=1,null=False)
	COMPONENTNAME = models.CharField(db_column='COMPONENTNAME',max_length=100,null=True)
	REFERENCE = models.CharField(db_column='REFERENCE',max_length=150,null=True)
	HIDDEN = models.CharField(db_column='HIDDEN',max_length=1,null=False)
	SCVENDOR = models.CharField(db_column='SCVENDOR',max_length=50,null=True)
	SCNAME = models.CharField(db_column='SCNAME',max_length=100,null=True)
	PATHID = models.BigIntegerField(db_column='PATHID',null=False)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 326 ################ Table DESC: XMII_PROPERTY ####################
class XMII_PROPERTY(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 327 ################ Table DESC: XMII_PROPERTY_SET ####################
class XMII_PROPERTY_SET(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 328 ################ Table DESC: XMII_PROPS_CONTEXT ####################
class XMII_PROPS_CONTEXT(models.Model):
	CONTEXTID = models.BigIntegerField(db_column='CONTEXTID',null=False)
	CONTEXTNAME = models.CharField(db_column='CONTEXTNAME',max_length=60,null=False)

	class Meta:
		unique_together = (('CONTEXTID',),)


# Position: 329 ################ Table DESC: XMII_PROP_GROUPS ####################
class XMII_PROP_GROUPS(models.Model):
	GROUPID = models.BigIntegerField(db_column='GROUPID',null=False)
	GROUPNAME = models.CharField(db_column='GROUPNAME',max_length=40,null=False)

	class Meta:
		unique_together = (('GROUPID',),)


# Position: 330 ################ Table DESC: Quality Portal Comments ####################
class XMII_QPCOMMENTS(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=75,null=True)
	COMMENTS = models.CharField(db_column='COMMENTS',max_length=255,null=True)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	DELETED = models.CharField(db_column='DELETED',max_length=1,null=True)
	CHARTNAME = models.CharField(db_column='CHARTNAME',max_length=80,null=False)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=75,null=False)
	ELEMENTKEY = models.CharField(db_column='ELEMENTKEY',max_length=245,null=False)
	CHARTTYPE = models.CharField(db_column='CHARTTYPE',max_length=30,null=False)

	class Meta:
		unique_together = (('CHARTNAME','CHARTTYPE','CREATED','CREATEDBY',),)


# Position: 331 ################ Table DESC: Quality Portal Suppressed Data Points ####################
class XMII_QPSUPPDPOINTS(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	CHARTNAME = models.CharField(db_column='CHARTNAME',max_length=80,null=False)
	ELEMENTKEY = models.CharField(db_column='ELEMENTKEY',max_length=245,null=False)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=75,null=False)

	class Meta:
		unique_together = (('CHARTNAME','ELEMENTKEY',),)


# Position: 332 ################ Table DESC: Quality Portal Suppressed Data Points ####################
class XMII_QPSUPRSDPOINT(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=75,null=True)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CHARTNAME = models.CharField(db_column='CHARTNAME',max_length=80,null=False)
	ELEMENTKEY = models.CharField(db_column='ELEMENTKEY',max_length=245,null=False)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=75,null=False)
	CHARTTYPE = models.CharField(db_column='CHARTTYPE',max_length=10,null=False)

	class Meta:
		unique_together = (('CHARTNAME','CHARTTYPE','ELEMENTKEY',),)


# Position: 333 ################ Table DESC: XMII_QUERYCACHE ####################
class XMII_QUERYCACHE(models.Model):
	EXPIRATION = models.DateTimeField(db_column='EXPIRATION',null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=False)
	ID = models.IntegerField(db_column='ID',null=False)
	PARAMS = models.BinaryField(db_column='PARAMS',max_length=1024*1024,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 334 ################ Table DESC: XMII_SAP Default Servers ####################
class XMII_SAPDFLTSERVER(models.Model):
	SERVER = models.CharField(db_column='SERVER',max_length=128,null=False)
	SERVER_TYPE = models.CharField(db_column='SERVER_TYPE',max_length=3,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 335 ################ Table DESC: XMII_CONNECTORPROP ####################
class XMII_SAPDFLTSRVPRP(models.Model):
	SERVER_ID = models.BigIntegerField(db_column='SERVER_ID',null=False)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=60,null=False)
	PROPDEFAULTVALUE = models.CharField(db_column='PROPDEFAULTVALUE',max_length=200,null=True)

	class Meta:
		unique_together = (('SERVER_ID','PROPNAME',),)


# Position: 336 ################ Table DESC: XMII_SAPSERVERPROP ####################
class XMII_SAPSERVERPROP(models.Model):
	SERVER_ALIAS = models.CharField(db_column='SERVER_ALIAS',max_length=50,null=False)
	PROPVALUE = models.CharField(db_column='PROPVALUE',max_length=200,null=True)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=60,null=False)

	class Meta:
		unique_together = (('SERVER_ALIAS','PROPNAME',),)


# Position: 337 ################ Table DESC: XMII_SAPSERVERS ####################
class XMII_SAPSERVERS(models.Model):
	SERVER_ALIAS = models.CharField(db_column='SERVER_ALIAS',max_length=50,null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	SERVER = models.CharField(db_column='SERVER',max_length=128,null=False)
	SERVER_TYPE = models.CharField(db_column='SERVER_TYPE',max_length=3,null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)

	class Meta:
		unique_together = (('SERVER_ALIAS',),)


# Position: 338 ################ Table DESC: XMII_SCCE_EXTN ####################
class XMII_SCCE_EXTN(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 339 ################ Table DESC: XMII_SCHEDLOCK ####################
class XMII_SCHEDLOCK(models.Model):
	TIMEMARKER = models.DateTimeField(db_column='TIMEMARKER',null=True)
	LOCK_NAME = models.CharField(db_column='LOCK_NAME',max_length=100,null=False)
	CHECK_LOCK = models.IntegerField(db_column='CHECK_LOCK',null=False)
	SERVER = models.CharField(db_column='SERVER',max_length=100,null=True)

	class Meta:
		unique_together = (('LOCK_NAME',),)


# Position: 340 ################ Table DESC: XMII_SCHEDULES ####################
class XMII_SCHEDULES(models.Model):
	DISPLAYNAME = models.CharField(db_column='DISPLAYNAME',max_length=50,null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=200,null=True)
	TIMEPERIODS = models.BinaryField(db_column='TIMEPERIODS',null=True)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	NAME = models.CharField(db_column='NAME',max_length=50,null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 341 ################ Table DESC: XMII_SCHED_HISTORY ####################
class XMII_SCHED_HISTORY(models.Model):
	STATUS = models.CharField(db_column='STATUS',max_length=255,null=False)
	CURRENTUSER = models.CharField(db_column='CURRENTUSER',max_length=200,null=False)
	HISTORY = models.DateTimeField(db_column='HISTORY',null=False)




# Position: 342 ################ Table DESC: XMII_SCHED_STATUS ####################
class XMII_SCHED_STATUS(models.Model):
	EXPECTED_STATUS = models.IntegerField(db_column='EXPECTED_STATUS',null=False)

	class Meta:
		unique_together = (('EXPECTED_STATUS',),)


# Position: 343 ################ Table DESC: XMII_SEQUENCE ####################
class XMII_SEQUENCE(models.Model):
	SEQVAL = models.BigIntegerField(db_column='SEQVAL',null=False)
	NAME = models.CharField(db_column='NAME',max_length=30,null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 344 ################ Table DESC: XMII_SERVERPRMMAP ####################
class XMII_SERVERPRMMAP(models.Model):
	ROLENAME = models.CharField(db_column='ROLENAME',max_length=256,null=False)
	SERVERNAME = models.CharField(db_column='SERVERNAME',max_length=50,null=False)

	class Meta:
		unique_together = (('SERVERNAME','ROLENAME',),)


# Position: 345 ################ Table DESC: XMII_SERVERPROP ####################
class XMII_SERVERPROP(models.Model):
	PROPVALUE = models.CharField(db_column='PROPVALUE',max_length=500,null=True)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=60,null=False)
	SERVERNAME = models.CharField(db_column='SERVERNAME',max_length=50,null=False)

	class Meta:
		unique_together = (('SERVERNAME','PROPNAME',),)


# Position: 346 ################ Table DESC: XMII_SERVERS ####################
class XMII_SERVERS(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=200,null=True)
	CONNECTORID = models.BigIntegerField(db_column='CONNECTORID',null=False)
	ENABLED = models.CharField(db_column='ENABLED',max_length=1,null=True)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	NAME = models.CharField(db_column='NAME',max_length=50,null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 347 ################ Table DESC: XMII_SHIFTSCHEDULE ####################
class XMII_SHIFTSCHEDULE(models.Model):
	FROMDATE = models.CharField(db_column='FROMDATE',max_length=50,null=False)
	TODATE = models.CharField(db_column='TODATE',max_length=50,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	SCHEDULENAME = models.CharField(db_column='SCHEDULENAME',max_length=50,null=True)
	PATTERNID = models.BigIntegerField(db_column='PATTERNID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 348 ################ Table DESC: XMII_SHIFT_DET ####################
class XMII_SHIFT_DET(models.Model):
	HOURID = models.BigIntegerField(db_column='HOURID',null=False)
	SHIFTWEEK = models.IntegerField(db_column='SHIFTWEEK',null=True)
	PATTERNNAME = models.CharField(db_column='PATTERNNAME',max_length=50,null=True)
	SHIFTHOUR = models.IntegerField(db_column='SHIFTHOUR',null=True)
	SHIFTYEAR = models.IntegerField(db_column='SHIFTYEAR',null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	SHIFTMONTH = models.IntegerField(db_column='SHIFTMONTH',null=True)
	SCHEDULENAME = models.CharField(db_column='SCHEDULENAME',max_length=50,null=True)
	SHIFTQUARTER = models.CharField(db_column='SHIFTQUARTER',max_length=2,null=True)
	PATTERNID = models.BigIntegerField(db_column='PATTERNID',null=True)
	SHIFTDAY = models.IntegerField(db_column='SHIFTDAY',null=True)
	SHIFTNAME = models.CharField(db_column='SHIFTNAME',max_length=50,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 349 ################ Table DESC: XMII_SHIFT_PATTERN ####################
class XMII_SHIFT_PATTERN(models.Model):
	PATTERNNAME = models.CharField(db_column='PATTERNNAME',max_length=50,null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=200,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 350 ################ Table DESC: XMII_SIMLATRGROUPS ####################
class XMII_SIMLATRGROUPS(models.Model):
	SIMULATORNAME = models.CharField(db_column='SIMULATORNAME',max_length=128,null=False)
	GROUPNAME = models.CharField(db_column='GROUPNAME',max_length=64,null=False)
	TAGNAME = models.CharField(db_column='TAGNAME',max_length=128,null=False)

	class Meta:
		unique_together = (('SIMULATORNAME','GROUPNAME','TAGNAME',),)


# Position: 351 ################ Table DESC: XMII_SIMLATRTAGS ####################
class XMII_SIMLATRTAGS(models.Model):
	SIMULATORNAME = models.CharField(db_column='SIMULATORNAME',max_length=128,null=False)
	TAGTYPE = models.CharField(db_column='TAGTYPE',max_length=256,null=False)
	MAXRANGE = models.CharField(db_column='MAXRANGE',max_length=256,null=False)
	TAGNAME = models.CharField(db_column='TAGNAME',max_length=128,null=False)
	MINRANGE = models.CharField(db_column='MINRANGE',max_length=256,null=False)
	WRITETAG = models.CharField(db_column='WRITETAG',max_length=16,null=True)
	TAGVALUE = models.CharField(db_column='TAGVALUE',max_length=256,null=False)

	class Meta:
		unique_together = (('SIMULATORNAME','TAGNAME',),)


# Position: 352 ################ Table DESC: XMII_SRCH_TEMPLATE ####################
class XMII_SRCH_TEMPLATE(models.Model):
	STARTDATE = models.DateTimeField(db_column='STARTDATE',null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	CREATEDON = models.DateTimeField(db_column='CREATEDON',null=True)
	USERNAME = models.CharField(db_column='USERNAME',max_length=25,null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIEDON = models.DateTimeField(db_column='MODIFIEDON',null=True)
	DURATION = models.CharField(db_column='DURATION',max_length=50,null=False)
	NAME = models.CharField(db_column='NAME',max_length=50,null=False)
	ENDDATE = models.DateTimeField(db_column='ENDDATE',null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 353 ################ Table DESC: XMII_STATSFILE ####################
class XMII_STATSFILE(models.Model):
	NUMBEROFRUNS = models.BigIntegerField(db_column='NUMBEROFRUNS',null=False)
	MINRUNTIME = models.BigIntegerField(db_column='MINRUNTIME',null=False)
	RECORDEDDATE = models.DateTimeField(db_column='RECORDEDDATE',null=False)
	TOTALRUNTIME = models.BigIntegerField(db_column='TOTALRUNTIME',null=False)
	FILEID = models.BigIntegerField(db_column='FILEID',null=False)
	MAXRUNTIME = models.BigIntegerField(db_column='MAXRUNTIME',null=False)

	class Meta:
		unique_together = (('RECORDEDDATE','FILEID',),)


# Position: 354 ################ Table DESC: XMII_STATSLOGIN ####################
class XMII_STATSLOGIN(models.Model):
	LOGINCOUNT = models.BigIntegerField(db_column='LOGINCOUNT',null=False)
	RECORDEDDATE = models.DateTimeField(db_column='RECORDEDDATE',null=False)
	USERNAME = models.CharField(db_column='USERNAME',max_length=150,null=False)

	class Meta:
		unique_together = (('RECORDEDDATE','USERNAME',),)


# Position: 355 ################ Table DESC: XMII_STATSMSGS ####################
class XMII_STATSMSGS(models.Model):
	TOTALDUPLICATE = models.BigIntegerField(db_column='TOTALDUPLICATE',null=False)
	TOTALRECEIVED = models.BigIntegerField(db_column='TOTALRECEIVED',null=False)
	PROCESSINGERROR = models.BigIntegerField(db_column='PROCESSINGERROR',null=False)
	MAPPEDCATEGORY = models.BigIntegerField(db_column='MAPPEDCATEGORY',null=False)
	RECORDEDDATE = models.DateTimeField(db_column='RECORDEDDATE',null=False)
	NORULEDEFINED = models.BigIntegerField(db_column='NORULEDEFINED',null=False)
	PROCESSINGEXCEPT = models.BigIntegerField(db_column='PROCESSINGEXCEPT',null=False)
	SERVERNAME = models.CharField(db_column='SERVERNAME',max_length=100,null=False)

	class Meta:
		unique_together = (('RECORDEDDATE','SERVERNAME',),)


# Position: 356 ################ Table DESC: XMII_STATSSERVER ####################
class XMII_STATSSERVER(models.Model):
	ROWSRETURNED = models.BigIntegerField(db_column='ROWSRETURNED',null=False)
	ERRORCOUNT = models.BigIntegerField(db_column='ERRORCOUNT',null=False)
	NUMBEROFHITS = models.BigIntegerField(db_column='NUMBEROFHITS',null=False)
	RECORDEDDATE = models.DateTimeField(db_column='RECORDEDDATE',null=False)
	SERVERNAME = models.CharField(db_column='SERVERNAME',max_length=50,null=False)
	TIMETORUN = models.BigIntegerField(db_column='TIMETORUN',null=False)
	COMMERRORS = models.BigIntegerField(db_column='COMMERRORS',null=False)

	class Meta:
		unique_together = (('RECORDEDDATE','SERVERNAME',),)


# Position: 357 ################ Table DESC: XMII_STATSTRX ####################
class XMII_STATSTRX(models.Model):
	ROOTTRXID = models.BigIntegerField(db_column='ROOTTRXID',null=False)
	LINK_DESTINATION = models.BinaryField(db_column='LINK_DESTINATION',null=True)
	PARENTTRXID = models.BigIntegerField(db_column='PARENTTRXID',null=False)
	STATS_COUNT = models.BigIntegerField(db_column='STATS_COUNT',null=False)
	STATS_MAX = models.BigIntegerField(db_column='STATS_MAX',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	STATS_TOTAL = models.BigIntegerField(db_column='STATS_TOTAL',null=False)
	ACTION_NAME = models.CharField(db_column='ACTION_NAME',max_length=255,null=False)
	STATS_AVG = models.BigIntegerField(db_column='STATS_AVG',null=False)
	STATS_MIN = models.BigIntegerField(db_column='STATS_MIN',null=False)
	SEQ_ID = models.BigIntegerField(db_column='SEQ_ID',null=False)

	class Meta:
		unique_together = (('ID','SEQ_ID',),)


# Position: 358 ################ Table DESC: XMII_STATSUSER ####################
class XMII_STATSUSER(models.Model):
	ROWSRETURNED = models.BigIntegerField(db_column='ROWSRETURNED',null=False)
	RECORDEDDATE = models.DateTimeField(db_column='RECORDEDDATE',null=False)
	NUMBERREQUESTS = models.BigIntegerField(db_column='NUMBERREQUESTS',null=False)
	USERNAME = models.CharField(db_column='USERNAME',max_length=150,null=False)

	class Meta:
		unique_together = (('RECORDEDDATE','USERNAME',),)


# Position: 359 ################ Table DESC: XMII_SYSPRM ####################
class XMII_SYSPRM(models.Model):
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=100,null=True)
	LISTABLE = models.CharField(db_column='LISTABLE',max_length=1,null=False)
	NAME = models.CharField(db_column='NAME',max_length=60,null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 360 ################ Table DESC: XMII_SYSPROPS ####################
class XMII_SYSPROPS(models.Model):
	PROPVALUE = models.CharField(db_column='PROPVALUE',max_length=255,null=True)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=255,null=False)

	class Meta:
		unique_together = (('PROPNAME',),)


# Position: 361 ################ Table DESC: XMII_TAG ####################
class XMII_TAG(models.Model):
	NAMESPACE = models.CharField(db_column='NAMESPACE',max_length=999,null=False)
	TAGALIAS = models.CharField(db_column='TAGALIAS',max_length=100,null=True)
	TAGOPERATION = models.CharField(db_column='TAGOPERATION',max_length=50,null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	CHANGELISTID = models.BigIntegerField(db_column='CHANGELISTID',null=True)
	TRX_PATH = models.CharField(db_column='TRX_PATH',max_length=250,null=True)
	SRCHKEYWORDS = models.CharField(db_column='SRCHKEYWORDS',max_length=255,null=True)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=False)
	MAPPINGTYPE = models.IntegerField(db_column='MAPPINGTYPE',null=False)
	ISINACTIVE = models.CharField(db_column='ISINACTIVE',max_length=10,null=True)
	ISCATEGORYSYNC = models.CharField(db_column='ISCATEGORYSYNC',max_length=1,null=False)
	SERVERNAME = models.CharField(db_column='SERVERNAME',max_length=50,null=True)
	SERVERNAMESPACE = models.CharField(db_column='SERVERNAMESPACE',max_length=300,null=True)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	FULL_KPI_PATH = models.CharField(db_column='FULL_KPI_PATH',max_length=501,null=True)
	TAGGROUPID = models.BigIntegerField(db_column='TAGGROUPID',null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	LOCKEDBY = models.CharField(db_column='LOCKEDBY',max_length=75,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 362 ################ Table DESC: XMII_TAGDEPENDENCY ####################
class XMII_TAGDEPENDENCY(models.Model):
	GROUPID = models.BigIntegerField(db_column='GROUPID',null=False)
	JARNAME = models.CharField(db_column='JARNAME',max_length=200,null=False)
	CONTENT = models.BinaryField(db_column='CONTENT',max_length=1024*1024,null=True)

	class Meta:
		unique_together = (('GROUPID','JARNAME',),)


# Position: 363 ################ Table DESC: XMII_TAGGROUP ####################
class XMII_TAGGROUP(models.Model):
	NAMESPACE = models.CharField(db_column='NAMESPACE',max_length=999,null=False)
	TAGGROUPOPERATION = models.CharField(db_column='TAGGROUPOPERATION',max_length=50,null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	CHANGELISTID = models.BigIntegerField(db_column='CHANGELISTID',null=True)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=False)
	SRCHKEYWORDS = models.CharField(db_column='SRCHKEYWORDS',max_length=500,null=True)
	MAPPINGTYPE = models.IntegerField(db_column='MAPPINGTYPE',null=False)
	ISCATEGORYSYNC = models.CharField(db_column='ISCATEGORYSYNC',max_length=1,null=False)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	PARENTID = models.BigIntegerField(db_column='PARENTID',null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	LOCKEDBY = models.CharField(db_column='LOCKEDBY',max_length=75,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 364 ################ Table DESC: XMII_TAGGROUPTYPE ####################
class XMII_TAGGROUPTYPE(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 365 ################ Table DESC: Live or Active version of XMII_TAGGROUP table  ####################
class XMII_TAGGROUP_ACT(models.Model):
	NAMESPACE = models.CharField(db_column='NAMESPACE',max_length=999,null=False)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	APPROVEDON = models.DateTimeField(db_column='APPROVEDON',null=True)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=True)
	SRCHKEYWORDS = models.CharField(db_column='SRCHKEYWORDS',max_length=255,null=True)
	MAPPINGTYPE = models.IntegerField(db_column='MAPPINGTYPE',null=False)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	APPLIEDBY = models.CharField(db_column='APPLIEDBY',max_length=50,null=True)
	PARENTID = models.BigIntegerField(db_column='PARENTID',null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	APPLIEDON = models.DateTimeField(db_column='APPLIEDON',null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	APPROVEDBY = models.CharField(db_column='APPROVEDBY',max_length=50,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 366 ################ Table DESC: _TAGGROUP_ST ####################
class XMII_TAGGROUP_ST(models.Model):
	NAMESPACEUP = models.CharField(db_column='NAMESPACEUP',max_length=999,null=False)
	NAMEUP = models.CharField(db_column='NAMEUP',max_length=100,null=False)
	DESCRIPTIONUP = models.CharField(db_column='DESCRIPTIONUP',max_length=255,null=True)
	SRCHKEYWORDSUP = models.CharField(db_column='SRCHKEYWORDSUP',max_length=255,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 367 ################ Table DESC: XMII_TAGGRP_ACT_ST ####################
class XMII_TAGGRP_ACT_ST(models.Model):
	NAMESPACEUP = models.CharField(db_column='NAMESPACEUP',max_length=999,null=False)
	NAMEUP = models.CharField(db_column='NAMEUP',max_length=100,null=False)
	DESCRIPTIONUP = models.CharField(db_column='DESCRIPTIONUP',max_length=255,null=True)
	SRCHKEYWORDSUP = models.CharField(db_column='SRCHKEYWORDSUP',max_length=255,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	APPROVEDBYUP = models.CharField(db_column='APPROVEDBYUP',max_length=50,null=True)
	APPLIEDBYUP = models.CharField(db_column='APPLIEDBYUP',max_length=50,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 368 ################ Table DESC: XMII_TAGG_AUTH ####################
class XMII_TAGG_AUTH(models.Model):
	USERGROUP = models.CharField(db_column='USERGROUP',max_length=200,null=True)
	PROPAGATE = models.CharField(db_column='PROPAGATE',max_length=1,null=True)
	TAGGROUPID = models.BigIntegerField(db_column='TAGGROUPID',null=True)
	TRANSPORTPERM = models.CharField(db_column='TRANSPORTPERM',max_length=1,null=True)
	READPERM = models.CharField(db_column='READPERM',max_length=1,null=True)
	EXECUTEPERM = models.CharField(db_column='EXECUTEPERM',max_length=1,null=True)
	WRITEPERM = models.CharField(db_column='WRITEPERM',max_length=1,null=True)
	DELETEPERM = models.CharField(db_column='DELETEPERM',max_length=1,null=True)




# Position: 369 ################ Table DESC: XMII_TAGG_AUTH_ACT ####################
class XMII_TAGG_AUTH_ACT(models.Model):
	USERGROUP = models.CharField(db_column='USERGROUP',max_length=200,null=True)
	PROPAGATE = models.CharField(db_column='PROPAGATE',max_length=1,null=True)
	TAGGROUPID = models.BigIntegerField(db_column='TAGGROUPID',null=True)
	TRANSPORTPERM = models.CharField(db_column='TRANSPORTPERM',max_length=1,null=True)
	READPERM = models.CharField(db_column='READPERM',max_length=1,null=True)
	EXECUTEPERM = models.CharField(db_column='EXECUTEPERM',max_length=1,null=True)
	WRITEPERM = models.CharField(db_column='WRITEPERM',max_length=1,null=True)
	DELETEPERM = models.CharField(db_column='DELETEPERM',max_length=1,null=True)




# Position: 370 ################ Table DESC: XMII_TAGKPIDIM ####################
class XMII_TAGKPIDIM(models.Model):
	VALUEPATH = models.CharField(db_column='VALUEPATH',max_length=1000,null=True)
	COLUMNNAME = models.CharField(db_column='COLUMNNAME',max_length=10,null=False)
	VALUETYPE = models.CharField(db_column='VALUETYPE',max_length=20,null=True)
	DIMENSIONNAME = models.CharField(db_column='DIMENSIONNAME',max_length=200,null=False)
	TAGID = models.BigIntegerField(db_column='TAGID',null=False)

	class Meta:
		unique_together = (('TAGID','DIMENSIONNAME',),)


# Position: 371 ################ Table DESC: XMII_TAGKPIDIM_ACT ####################
class XMII_TAGKPIDIM_ACT(models.Model):
	VALUEPATH = models.CharField(db_column='VALUEPATH',max_length=1000,null=True)
	COLUMNNAME = models.CharField(db_column='COLUMNNAME',max_length=10,null=False)
	VALUETYPE = models.CharField(db_column='VALUETYPE',max_length=20,null=True)
	DIMENSIONNAME = models.CharField(db_column='DIMENSIONNAME',max_length=200,null=False)
	TAGID = models.BigIntegerField(db_column='TAGID',null=False)

	class Meta:
		unique_together = (('TAGID','DIMENSIONNAME',),)


# Position: 372 ################ Table DESC: XMII_TAGPROP ####################
class XMII_TAGPROP(models.Model):
	PROPERTYTYPEUP = models.CharField(db_column='PROPERTYTYPEUP',max_length=50,null=False)
	PROPERTYNAME = models.CharField(db_column='PROPERTYNAME',max_length=50,null=False)
	PROPERTYSETID = models.BigIntegerField(db_column='PROPERTYSETID',null=False)
	PROPERTYDATATYPE = models.IntegerField(db_column='PROPERTYDATATYPE',null=False)
	PROPSTRINGVALUEUP = models.CharField(db_column='PROPSTRINGVALUEUP',max_length=999,null=True)
	PROPERTYTYPE = models.CharField(db_column='PROPERTYTYPE',max_length=50,null=False)
	PROPSTRINGVALUE = models.CharField(db_column='PROPSTRINGVALUE',max_length=999,null=True)
	PCOMETADATANAME = models.CharField(db_column='PCOMETADATANAME',max_length=50,null=True)
	TAGID = models.BigIntegerField(db_column='TAGID',null=False)
	PROPERTYVALUE = models.BinaryField(db_column='PROPERTYVALUE',max_length=1024*1024,null=True)
	PROPERTYNAMEUP = models.CharField(db_column='PROPERTYNAMEUP',max_length=50,null=False)

	class Meta:
		unique_together = (('TAGID','PROPERTYSETID','PROPERTYNAME',),)


# Position: 373 ################ Table DESC: XMII_TAGPROP ####################
class XMII_TAGPROP_ACT(models.Model):
	PROPERTYTYPEUP = models.CharField(db_column='PROPERTYTYPEUP',max_length=50,null=False)
	PROPERTYNAME = models.CharField(db_column='PROPERTYNAME',max_length=50,null=False)
	PROPERTYSETID = models.BigIntegerField(db_column='PROPERTYSETID',null=False)
	PROPERTYDATATYPE = models.IntegerField(db_column='PROPERTYDATATYPE',null=False)
	PROPSTRINGVALUEUP = models.CharField(db_column='PROPSTRINGVALUEUP',max_length=999,null=True)
	PROPERTYTYPE = models.CharField(db_column='PROPERTYTYPE',max_length=50,null=False)
	PROPSTRINGVALUE = models.CharField(db_column='PROPSTRINGVALUE',max_length=999,null=True)
	PCOMETADATANAME = models.CharField(db_column='PCOMETADATANAME',max_length=50,null=True)
	TAGID = models.BigIntegerField(db_column='TAGID',null=False)
	PROPERTYVALUE = models.BinaryField(db_column='PROPERTYVALUE',max_length=1024*1024,null=True)
	PROPERTYNAMEUP = models.CharField(db_column='PROPERTYNAMEUP',max_length=50,null=False)

	class Meta:
		unique_together = (('TAGID','PROPERTYSETID','PROPERTYNAME',),)


# Position: 374 ################ Table DESC: XMII_TAGPROP ####################
class XMII_TAGPROP_LOG(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	PROPERTYNAME = models.CharField(db_column='PROPERTYNAME',max_length=60,null=False)
	PROPCURRENTVALUE = models.BinaryField(db_column='PROPCURRENTVALUE',max_length=1024*1024,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	TAGID = models.BigIntegerField(db_column='TAGID',null=False)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	PROPERTYOLDVALUE = models.BinaryField(db_column='PROPERTYOLDVALUE',max_length=1024*1024,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 375 ################ Table DESC: Live or Active version of XMII_TAG table ####################
class XMII_TAG_ACT(models.Model):
	NAMESPACE = models.CharField(db_column='NAMESPACE',max_length=999,null=False)
	TAGALIAS = models.CharField(db_column='TAGALIAS',max_length=100,null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	APPROVEDON = models.DateTimeField(db_column='APPROVEDON',null=True)
	TRX_PATH = models.CharField(db_column='TRX_PATH',max_length=250,null=True)
	SRCHTAGNAMESPACE = models.CharField(db_column='SRCHTAGNAMESPACE',max_length=300,null=True)
	SRCHKEYWORDS = models.CharField(db_column='SRCHKEYWORDS',max_length=255,null=True)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=False)
	MAPPINGTYPE = models.IntegerField(db_column='MAPPINGTYPE',null=False)
	ISINACTIVE = models.CharField(db_column='ISINACTIVE',max_length=10,null=True)
	SERVERNAME = models.CharField(db_column='SERVERNAME',max_length=50,null=True)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	APPLIEDBY = models.CharField(db_column='APPLIEDBY',max_length=50,null=True)
	FULL_KPI_PATH = models.CharField(db_column='FULL_KPI_PATH',max_length=501,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	TAGGROUPID = models.BigIntegerField(db_column='TAGGROUPID',null=False)
	APPLIEDON = models.DateTimeField(db_column='APPLIEDON',null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	APPROVEDBY = models.CharField(db_column='APPROVEDBY',max_length=50,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 376 ################ Table DESC: XMII_TAG_ACT_ST ####################
class XMII_TAG_ACT_ST(models.Model):
	NAMESPACEUP = models.CharField(db_column='NAMESPACEUP',max_length=999,null=False)
	NAMEUP = models.CharField(db_column='NAMEUP',max_length=100,null=False)
	FULL_KPI_PATH = models.CharField(db_column='FULL_KPI_PATH',max_length=501,null=True)
	DESCRIPTIONUP = models.CharField(db_column='DESCRIPTIONUP',max_length=255,null=True)
	TRX_PATH = models.CharField(db_column='TRX_PATH',max_length=250,null=True)
	SRCHKEYWORDSUP = models.CharField(db_column='SRCHKEYWORDSUP',max_length=255,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	APPROVEDBYUP = models.CharField(db_column='APPROVEDBYUP',max_length=50,null=True)
	APPLIEDBYUP = models.CharField(db_column='APPLIEDBYUP',max_length=50,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 377 ################ Table DESC: XMII_TAG_ATTRIB ####################
class XMII_TAG_ATTRIB(models.Model):
	GROUPID = models.BigIntegerField(db_column='GROUPID',null=False)
	PARAMNAME = models.CharField(db_column='PARAMNAME',max_length=100,null=False)
	TAGNAME = models.CharField(db_column='TAGNAME',max_length=100,null=False)
	REQUIRED = models.CharField(db_column='REQUIRED',max_length=10,null=False)

	class Meta:
		unique_together = (('GROUPID','TAGNAME','PARAMNAME',),)


# Position: 378 ################ Table DESC: XMII_TAG_METAINFO ####################
class XMII_TAG_METAINFO(models.Model):
	TAGID = models.BigIntegerField(db_column='TAGID',null=False)
	JRA_PIC_ID = models.BigIntegerField(db_column='JRA_PIC_ID',null=True)




# Position: 379 ################ Table DESC: XMII_TAG_PROPSET ####################
class XMII_TAG_PROPSET(models.Model):
	PROPERTYSETID = models.BigIntegerField(db_column='PROPERTYSETID',null=False)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=False)
	TAGID = models.BigIntegerField(db_column='TAGID',null=False)
	ISSYNC = models.CharField(db_column='ISSYNC',max_length=1,null=False)

	class Meta:
		unique_together = (('TAGID','PROPERTYSETID',),)


# Position: 380 ################ Table DESC: XMII_TAG_PSET_ACT ####################
class XMII_TAG_PSET_ACT(models.Model):
	PROPERTYSETID = models.BigIntegerField(db_column='PROPERTYSETID',null=False)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=False)
	TAGID = models.BigIntegerField(db_column='TAGID',null=False)

	class Meta:
		unique_together = (('TAGID','PROPERTYSETID',),)


# Position: 381 ################ Table DESC: XMII_TAG_ST ####################
class XMII_TAG_ST(models.Model):
	NAMESPACEUP = models.CharField(db_column='NAMESPACEUP',max_length=999,null=False)
	NAMEUP = models.CharField(db_column='NAMEUP',max_length=100,null=False)
	FULL_KPI_PATH = models.CharField(db_column='FULL_KPI_PATH',max_length=501,null=True)
	DESCRIPTIONUP = models.CharField(db_column='DESCRIPTIONUP',max_length=255,null=True)
	TRX_PATH = models.CharField(db_column='TRX_PATH',max_length=250,null=True)
	SRCHKEYWORDSUP = models.CharField(db_column='SRCHKEYWORDSUP',max_length=255,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 382 ################ Table DESC: XMII_TAG_TRX ####################
class XMII_TAG_TRX(models.Model):
	PARAMNAME = models.CharField(db_column='PARAMNAME',max_length=50,null=False)
	PARAMTYPE = models.CharField(db_column='PARAMTYPE',max_length=10,null=True)
	TAGID = models.BigIntegerField(db_column='TAGID',null=False)
	PARAMVALUE = models.CharField(db_column='PARAMVALUE',max_length=200,null=True)

	class Meta:
		unique_together = (('TAGID','PARAMNAME',),)


# Position: 383 ################ Table DESC: XMII_TAG_TRX_ACT ####################
class XMII_TAG_TRX_ACT(models.Model):
	PARAMNAME = models.CharField(db_column='PARAMNAME',max_length=50,null=False)
	PARAMTYPE = models.CharField(db_column='PARAMTYPE',max_length=10,null=True)
	TAGID = models.BigIntegerField(db_column='TAGID',null=False)
	PARAMVALUE = models.CharField(db_column='PARAMVALUE',max_length=200,null=True)

	class Meta:
		unique_together = (('TAGID','PARAMNAME',),)


# Position: 384 ################ Table DESC: XMII_TARIFF_CAT ####################
class XMII_TARIFF_CAT(models.Model):
	CATINFOID = models.BigIntegerField(db_column='CATINFOID',null=False)
	TARIFFID = models.BigIntegerField(db_column='TARIFFID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 385 ################ Table DESC: XMII_TEMPFILES ####################
class XMII_TEMPFILES(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=255,null=True)
	TEXT = models.BinaryField(db_column='TEXT',max_length=1024*1024,null=True)
	FILETYPE = models.CharField(db_column='FILETYPE',max_length=100,null=True)
	NAME = models.CharField(db_column='NAME',max_length=200,null=False)

	class Meta:
		unique_together = (('NAME',),)


# Position: 386 ################ Table DESC: XMII_TG_AUTH_TASK ####################
class XMII_TG_AUTH_TASK(models.Model):
	NAMESPACE = models.CharField(db_column='NAMESPACE',max_length=999,null=False)
	STATUS = models.CharField(db_column='STATUS',max_length=1,null=True)
	CHANGELISTID = models.BigIntegerField(db_column='CHANGELISTID',null=False)
	TAGGROUPID = models.BigIntegerField(db_column='TAGGROUPID',null=False)
	USERNAME = models.CharField(db_column='USERNAME',max_length=75,null=False)




# Position: 387 ################ Table DESC: XMII_TG_METAINFO ####################
class XMII_TG_METAINFO(models.Model):
	TGID = models.BigIntegerField(db_column='TGID',null=False)
	JRA_PIC_ID = models.BigIntegerField(db_column='JRA_PIC_ID',null=True)




# Position: 388 ################ Table DESC: XMII_TG_PROP ####################
class XMII_TG_PROP(models.Model):
	PROPERTYTYPEUP = models.CharField(db_column='PROPERTYTYPEUP',max_length=50,null=False)
	PROPERTYNAME = models.CharField(db_column='PROPERTYNAME',max_length=50,null=False)
	TAGGROUPID = models.BigIntegerField(db_column='TAGGROUPID',null=False)
	PROPERTYSETID = models.BigIntegerField(db_column='PROPERTYSETID',null=False)
	PROPERTYDATATYPE = models.IntegerField(db_column='PROPERTYDATATYPE',null=False)
	PROPSTRINGVALUEUP = models.CharField(db_column='PROPSTRINGVALUEUP',max_length=999,null=True)
	PROPERTYTYPE = models.CharField(db_column='PROPERTYTYPE',max_length=50,null=False)
	PROPSTRINGVALUE = models.CharField(db_column='PROPSTRINGVALUE',max_length=999,null=True)
	PROPERTYVALUE = models.BinaryField(db_column='PROPERTYVALUE',max_length=1024*1024,null=True)
	PROPERTYNAMEUP = models.CharField(db_column='PROPERTYNAMEUP',max_length=50,null=False)

	class Meta:
		unique_together = (('TAGGROUPID','PROPERTYSETID','PROPERTYNAME',),)


# Position: 389 ################ Table DESC: XMII_TG_PROP_ACT ####################
class XMII_TG_PROP_ACT(models.Model):
	PROPERTYTYPEUP = models.CharField(db_column='PROPERTYTYPEUP',max_length=50,null=False)
	PROPERTYNAME = models.CharField(db_column='PROPERTYNAME',max_length=50,null=False)
	TAGGROUPID = models.BigIntegerField(db_column='TAGGROUPID',null=False)
	PROPERTYSETID = models.BigIntegerField(db_column='PROPERTYSETID',null=False)
	PROPERTYDATATYPE = models.IntegerField(db_column='PROPERTYDATATYPE',null=False)
	PROPSTRINGVALUEUP = models.CharField(db_column='PROPSTRINGVALUEUP',max_length=999,null=True)
	PROPERTYTYPE = models.CharField(db_column='PROPERTYTYPE',max_length=50,null=False)
	PROPSTRINGVALUE = models.CharField(db_column='PROPSTRINGVALUE',max_length=999,null=True)
	PROPERTYVALUE = models.BinaryField(db_column='PROPERTYVALUE',max_length=1024*1024,null=True)
	PROPERTYNAMEUP = models.CharField(db_column='PROPERTYNAMEUP',max_length=50,null=False)

	class Meta:
		unique_together = (('TAGGROUPID','PROPERTYSETID','PROPERTYNAME',),)


# Position: 390 ################ Table DESC: XMII_TAGPROP ####################
class XMII_TG_PROP_LOG(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	PROPERTYNAME = models.CharField(db_column='PROPERTYNAME',max_length=60,null=False)
	PROPCURRENTVALUE = models.BinaryField(db_column='PROPCURRENTVALUE',max_length=1024*1024,null=True)
	TAGGROUPID = models.BigIntegerField(db_column='TAGGROUPID',null=False)
	ID = models.BigIntegerField(db_column='ID',null=False)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	PROPERTYOLDVALUE = models.BinaryField(db_column='PROPERTYOLDVALUE',max_length=1024*1024,null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 391 ################ Table DESC: XMII_TG_PSET ####################
class XMII_TG_PSET(models.Model):
	TAGGROUPID = models.BigIntegerField(db_column='TAGGROUPID',null=False)
	PROPERTYSETID = models.BigIntegerField(db_column='PROPERTYSETID',null=False)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=False)
	ISSYNC = models.CharField(db_column='ISSYNC',max_length=1,null=False)

	class Meta:
		unique_together = (('TAGGROUPID','PROPERTYSETID',),)


# Position: 392 ################ Table DESC: XMII_TG_PSET_ACT ####################
class XMII_TG_PSET_ACT(models.Model):
	TAGGROUPID = models.BigIntegerField(db_column='TAGGROUPID',null=False)
	PROPERTYSETID = models.BigIntegerField(db_column='PROPERTYSETID',null=False)
	CATEGORYID = models.BigIntegerField(db_column='CATEGORYID',null=False)

	class Meta:
		unique_together = (('TAGGROUPID','PROPERTYSETID',),)


# Position: 393 ################ Table DESC: XMII_TIMEPERIOD ####################
class XMII_TIMEPERIOD(models.Model):
	DISPLAYNAME = models.CharField(db_column='DISPLAYNAME',max_length=50,null=False)
	STARTDATE = models.CharField(db_column='STARTDATE',max_length=50,null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	FORMAT = models.CharField(db_column='FORMAT',max_length=50,null=True)
	DURATIONUNIT = models.CharField(db_column='DURATIONUNIT',max_length=2,null=True)
	NAME = models.CharField(db_column='NAME',max_length=50,null=False)
	ENDDATE = models.CharField(db_column='ENDDATE',max_length=50,null=True)
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	STARTTIME = models.CharField(db_column='STARTTIME',max_length=20,null=True)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=200,null=True)
	DAYNAME = models.CharField(db_column='DAYNAME',max_length=50,null=True)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)
	DURATION = models.CharField(db_column='DURATION',max_length=10,null=True)

	class Meta:
		unique_together = (('NAME',),)


# Position: 394 ################ Table DESC: XMII_TMPLTPRMMAP ####################
class XMII_TMPLTPRMMAP(models.Model):
	ALLOWWRITE = models.CharField(db_column='ALLOWWRITE',max_length=1,null=False)
	TEMPLATEID = models.BigIntegerField(db_column='TEMPLATEID',null=False)
	ROLENAME = models.CharField(db_column='ROLENAME',max_length=60,null=False)




# Position: 395 ################ Table DESC: XMII_TMPLTPROP ####################
class XMII_TMPLTPROP(models.Model):
	OVERRIDE = models.CharField(db_column='OVERRIDE',max_length=1,null=False)
	PROPVALUE = models.BinaryField(db_column='PROPVALUE',null=True)
	TEMPLATEID = models.BigIntegerField(db_column='TEMPLATEID',null=False)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=60,null=False)

	class Meta:
		unique_together = (('TEMPLATEID','PROPNAME',),)


# Position: 396 ################ Table DESC: XMII_TMPLTS ####################
class XMII_TMPLTS(models.Model):
	TEMPLATETYPEID = models.BigIntegerField(db_column='TEMPLATETYPEID',null=False)
	DESCRIPTION = models.CharField(db_column='DESCRIPTION',max_length=200,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	NAME = models.CharField(db_column='NAME',max_length=100,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 397 ################ Table DESC: XMII_TMPLTTYPE ####################
class XMII_TMPLTTYPE(models.Model):
	KIND = models.CharField(db_column='KIND',max_length=20,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	NAME = models.CharField(db_column='NAME',max_length=20,null=False)

	class Meta:
		unique_together = (('ID',),)


# Position: 398 ################ Table DESC: XMII_TMPLT_GRP_MAP ####################
class XMII_TMPLT_GRP_MAP(models.Model):
	GROUPID = models.BigIntegerField(db_column='GROUPID',null=False)
	TEMPLATEID = models.BigIntegerField(db_column='TEMPLATEID',null=False)

	class Meta:
		unique_together = (('TEMPLATEID','GROUPID',),)


# Position: 399 ################ Table DESC: XMII_TMPL_CONTEXT ####################
class XMII_TMPL_CONTEXT(models.Model):
	GROUPID = models.BigIntegerField(db_column='GROUPID',null=False)
	DATATYPE = models.BigIntegerField(db_column='DATATYPE',null=False)
	TEMPLATEID = models.BigIntegerField(db_column='TEMPLATEID',null=False)
	PROPNAME = models.CharField(db_column='PROPNAME',max_length=60,null=False)
	LANGUAGEKEY = models.CharField(db_column='LANGUAGEKEY',max_length=75,null=True)
	CONTEXT = models.BigIntegerField(db_column='CONTEXT',null=True)

	class Meta:
		unique_together = (('PROPNAME','GROUPID','TEMPLATEID',),)


# Position: 400 ################ Table DESC: XMII_TRANSACTIONS ####################
class XMII_TRANSACTIONS(models.Model):
	INSTANCE_OUTPUT = models.BinaryField(db_column='INSTANCE_OUTPUT',max_length=1024*1024,null=True)
	RUNTIME = models.IntegerField(db_column='RUNTIME',null=False)
	ENDTIME = models.DateTimeField(db_column='ENDTIME',null=True)
	LOG = models.BinaryField(db_column='LOG',null=True)
	MNG_THREAD_NAME = models.CharField(db_column='MNG_THREAD_NAME',max_length=1000,null=True)
	STATUS_DETAILS = models.BinaryField(db_column='STATUS_DETAILS',null=True)
	NAME = models.CharField(db_column='NAME',max_length=250,null=False)
	EXPIRATION = models.DateTimeField(db_column='EXPIRATION',null=True)
	STATUS = models.IntegerField(db_column='STATUS',null=False)
	STARTTIME = models.DateTimeField(db_column='STARTTIME',null=False)
	ACTION_THREAD_NAME = models.CharField(db_column='ACTION_THREAD_NAME',max_length=1000,null=True)
	SERVER = models.CharField(db_column='SERVER',max_length=100,null=True)
	TRX_THREAD_NAME = models.CharField(db_column='TRX_THREAD_NAME',max_length=1000,null=True)
	ID = models.BigIntegerField(db_column='ID',null=False)
	RUNNING_USER = models.CharField(db_column='RUNNING_USER',max_length=100,null=False)
	DURATION = models.BigIntegerField(db_column='DURATION',null=True)

	class Meta:
		unique_together = (('ID',),)


# Position: 401 ################ Table DESC: XMII_UNITCONV ####################
class XMII_UNITCONV(models.Model):
	MULTIPLIER = models.FloatField(db_column='MULTIPLIER',null=False)
	TOUNIT = models.CharField(db_column='TOUNIT',max_length=10,null=False)
	FROMUNIT = models.CharField(db_column='FROMUNIT',max_length=10,null=False)

	class Meta:
		unique_together = (('FROMUNIT','TOUNIT',),)


# Position: 402 ################ Table DESC: XMII_UOM ####################
class XMII_UOM(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 403 ################ Table DESC: XMII_USEINDEX ####################
class XMII_USEINDEX(models.Model):
	DDDUMMY = models.BinaryField(db_column='DDDUMMY',null=True)




# Position: 404 ################ Table DESC: XMII_USER_FAV_DSH ####################
class XMII_USER_FAV_DSH(models.Model):
	USERNAME = models.CharField(db_column='USERNAME',max_length=75,null=False)
	FILEID = models.BigIntegerField(db_column='FILEID',null=False)




# Position: 405 ################ Table DESC: XMII_WHITELIST ####################
class XMII_WHITELIST(models.Model):
	RESOURCEVALUE = models.CharField(db_column='RESOURCEVALUE',max_length=100,null=False)
	RESOURCE = models.CharField(db_column='RESOURCE',max_length=100,null=False)

	class Meta:
		unique_together = (('RESOURCE','RESOURCEVALUE',),)


# Position: 406 ################ Table DESC: XMII_WSSERVERPROPS ####################
class XMII_WSSERVERPROPS(models.Model):
	MESSAGENAMEXPATH = models.CharField(db_column='MESSAGENAMEXPATH',max_length=500,null=True)
	MESSAGEUIDXPATH = models.CharField(db_column='MESSAGEUIDXPATH',max_length=500,null=True)
	SCHEMAPATH = models.CharField(db_column='SCHEMAPATH',max_length=330,null=False)

	class Meta:
		unique_together = (('SCHEMAPATH',),)


# Position: 407 ################ Table DESC: XMII_XMLQUEUE ####################
class XMII_XMLQUEUE(models.Model):
	CREATED = models.DateTimeField(db_column='CREATED',null=True)
	MODIFIEDBY = models.CharField(db_column='MODIFIEDBY',max_length=50,null=True)
	QUEUENAME = models.CharField(db_column='QUEUENAME',max_length=200,null=False)
	TEXT = models.BinaryField(db_column='TEXT',null=True)
	ID = models.CharField(db_column='ID',max_length=75,null=False)
	MODIFIED = models.DateTimeField(db_column='MODIFIED',null=True)
	CREATEDBY = models.CharField(db_column='CREATEDBY',max_length=50,null=True)

	class Meta:
		unique_together = (('ID','QUEUENAME',),)


