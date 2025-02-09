<?xml version="1.0" encoding="iso-8859-1"?>
<?mso-application progid="Excel.Sheet"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="xml" indent="yes" />
<xsl:template match="/">
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
<Styles>
      <Style ss:ID="header">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
         </Borders>
         <Font ss:Bold="1" />
	<Interior ss:Color="#C0C0C0" ss:Pattern="Solid"/>
      </Style>
 <Style ss:ID="green">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
         </Borders>
         <Font ss:Bold="1" ss:Color="#FFFFFF"/>
	<Interior ss:Color="#098E03" ss:Pattern="Solid"/>
      </Style>
 <Style ss:ID="red">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
         </Borders>
         <Font ss:Bold="1" ss:Color="#FFFFFF"/>
	<Interior ss:Color="#FF0000" ss:Pattern="Solid"/>
      </Style>
 <Style ss:ID="yellow">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
         </Borders>
         <Font ss:Bold="1" ss:Color="#000000"/>
	<Interior ss:Color="#fff099" ss:Pattern="Solid"/>
      </Style>
 <Style ss:ID="orange">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
         </Borders>
         <Font ss:Bold="1" ss:Color="#FFFFFF"/>
	<Interior ss:Color="#ff8c00" ss:Pattern="Solid"/>
      </Style>	
  <Style ss:ID="s65">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom"/>
         </Borders>
   <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
  </Style>
	<Style ss:ID="s76">
  	 <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
  	 <Borders>
    	<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
  	 </Borders>
	<Interior ss:Color="#C0C0C0" ss:Pattern="Solid"/>
   	<Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="14"
    	ss:Bold="1"/>
   	<NumberFormat/>
   	<Protection/>
 	 </Style>
   </Styles>
 <Worksheet ss:Name="MaterialReplinishmentReport.xls">
  <Table ss:ExpandedRowCount="{count(//Row)+4}" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="15">
<xsl:for-each select='//Row[1]/*'>
	<Column ss:Width="100" ss:Span="4"/>
	</xsl:for-each>
	<Row ss:AutoFitHeight="0">
    		<Cell ss:Index="4" ss:MergeAcross="4" ss:StyleID="s76" ss:id="crreview"><Data ss:Type="String">Material Replenishment Report</Data></Cell>
   	</Row>
<Row ss:AutoFitHeight="0" ss:StyleID="s65">
    <Cell/>
</Row>
	<Row>
		<xsl:for-each select='//Row[1]/*'>
			
				<Cell ss:id="{local-name()}" ss:StyleID="header">
					<Data ss:Type="String"><xsl:value-of select='local-name()'/></Data>
				</Cell>
			
		</xsl:for-each>	
	</Row>

	<xsl:for-each select='//Row'>

	<Row>
		<xsl:choose>

			<xsl:when  test="TOStatus='Confirmed'" >
		<xsl:for-each select='./*'>
			<Cell ss:id="{local-name()}" ss:StyleID="green"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
		</xsl:for-each>
	</xsl:when>
				<xsl:when  test="TOStatus='Cancelled'" >
		<xsl:for-each select='./*'>
			<Cell ss:id="{local-name()}" ss:StyleID="red"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
		</xsl:for-each>
	</xsl:when>
				<xsl:when  test="TOStatus='Not Confirmed'" >
		<xsl:for-each select='./*'>
			<Cell ss:id="{local-name()}" ss:StyleID="orange"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
		</xsl:for-each>
	</xsl:when>

			<xsl:otherwise>
		<xsl:for-each select='./*'>
			
				<Cell ss:id="{local-name()}" ss:StyleID="yellow">
					<Data ss:Type="String"><xsl:value-of select='string(.)'/></Data>
				</Cell>
			
		</xsl:for-each>
			</xsl:otherwise>
			</xsl:choose>
	</Row>
	</xsl:for-each>
  </Table>
 </Worksheet>
</Workbook>

</xsl:template>
</xsl:stylesheet>