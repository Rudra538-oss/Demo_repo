<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="xml" indent="yes" />
<xsl:template match="/">
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">

<Author>Jemin Tanna</Author>

<LastAuthor>Sharma, M Saurabh</LastAuthor>

<Created>2012-06-12T08:40:31Z</Created>

<LastSaved>2013-02-07T06:38:47Z</LastSaved>

<Company>SAP</Company>

<Version>15.00</Version>

</DocumentProperties>


<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">

<AllowPNG/>

</OfficeDocumentSettings>


<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">

<WindowHeight>8535</WindowHeight>

<WindowWidth>24000</WindowWidth>

<WindowTopX>0</WindowTopX>

<WindowTopY>0</WindowTopY>

<ProtectStructure>False</ProtectStructure>

<ProtectWindows>False</ProtectWindows>

</ExcelWorkbook>

<Styles>
      <Style ss:ID="header">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
         </Borders>
         
      </Style>
      <Style ss:ID="body">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom"/>
         </Borders>
         
      </Style>
   </Styles>
<Worksheet ss:Name="Material Group">
  <Table ss:ExpandedRowCount="{count(//Row)+1}" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="15">
	<xsl:for-each select='//Row[1]/*'>
		<Column ss:Width="120" ss:Span="4"/>
	</xsl:for-each>

	<Row>
		<xsl:for-each select='//Row[1]/*'>
			<Cell ss:id="{local-name()}" ss:StyleID="header"><Data ss:Type="String"><xsl:value-of select='local-name()'/></Data></Cell>
		</xsl:for-each>	
	</Row>

	<xsl:for-each select='//Row'>
	<Row>
		<xsl:for-each select='./*'>
			<Cell ss:id="{local-name()}" ss:StyleID="body"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
		</xsl:for-each>
	</Row>
	</xsl:for-each>
  </Table>

 </Worksheet>


</Workbook>

</xsl:template>
</xsl:stylesheet>
