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
         <Font ss:Bold="1"/>
      </Style>
 <Style ss:ID="Parameter">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
         </Borders>
         <Font ss:Bold="1"/>
	<Interior ss:Color="#FF8C00" ss:Pattern="Solid"/>
      </Style>
      <Style ss:ID="body">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom"/>
         </Borders>
	</Style>
	<Style ss:ID="Total">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom"/>
         </Borders>
		 <Interior ss:Color="#FFFF00" ss:Pattern="Solid"/>
	</Style>
	
  <Style ss:ID="s65">
   <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="s66">
   <Alignment ss:Vertical="Bottom"/>
   <Borders>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="Arial" ss:Bold="1"/>
   <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
   <NumberFormat/>
   <Protection/>
  </Style>
	<Style ss:ID="s76">
  	 <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
  	 <Borders>
    	<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
  	 </Borders>
   	<Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="14" ss:Color="BLUE"
    	ss:Bold="1"/>
   	<NumberFormat/>
   	<Protection/>
 	 </Style>
   </Styles>
 <Worksheet ss:Name="Material Group">
  <Table ss:ExpandedRowCount="{count(//Row)+4}" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="15">
<xsl:for-each select='//Row[1]/*'>
		<Column ss:Width="155" ss:Span="4"/>
	</xsl:for-each>
	<Row ss:AutoFitHeight="0">
    		<Cell ss:Index="4" ss:MergeAcross="2" ss:StyleID="s76" ss:id="Stoppages"><Data ss:Type="String">Material Group</Data></Cell>
   	</Row>
<Row>
		<xsl:for-each select='//TransactionProperties/*'>
			<Cell ss:id="{local-name()}" ss:StyleID="Parameter"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
		</xsl:for-each>	
	</Row>
	<Row ss:AutoFitHeight="0" ss:StyleID="s65">
    <Cell ss:StyleID="s66"/>
    <Cell ss:StyleID="s66"/>
    <Cell ss:StyleID="s66"/>
    <Cell ss:StyleID="s66"/>
    <Cell ss:StyleID="s66"/>
    <Cell ss:StyleID="s66"/>
    <Cell ss:StyleID="s66"/>
   </Row>
	<Row>
		<xsl:for-each select='//Row[1]/*'>
			<Cell ss:id="{local-name()}" ss:StyleID="header"><Data ss:Type="String"><xsl:value-of select='local-name()'/></Data></Cell>
		</xsl:for-each>	
	</Row>

	<xsl:for-each select='//Row'>
	 <xsl:choose>
	<xsl:when  test="contains(ProcessOrder, 'Total')">
	<Row>
		<xsl:for-each select='./*'>
			<Cell ss:id="{local-name()}" ss:StyleID="Total"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
		</xsl:for-each>
	</Row>
	</xsl:when>
	<xsl:otherwise>
	<Row>
		<xsl:for-each select='./*'>
			<Cell ss:id="{local-name()}" ss:StyleID="body"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
		</xsl:for-each>
	</Row>
	</xsl:otherwise>
	</xsl:choose>
	</xsl:for-each>
  </Table>
 </Worksheet>
</Workbook>

</xsl:template>
</xsl:stylesheet>