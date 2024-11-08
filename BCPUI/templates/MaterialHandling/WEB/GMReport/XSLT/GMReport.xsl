<?xml version="1.0" encoding="iso-8859-15"?>
<?mso-application progid="Excel.Sheet"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
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
	<Interior ss:Color="#F08080" ss:Pattern="Solid"/>
      </Style>
      <Style ss:ID="label">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
         </Borders>
         <Font ss:Bold="1" />
	<Interior ss:Color="#f9b68e" ss:Pattern="Solid"/>
      </Style>
 <Style ss:ID="green">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
         </Borders>
         <Font ss:Bold="0"/>
	<Interior ss:Color="#5cb85c" ss:Pattern="Solid"/>
      </Style>
 <Style ss:ID="red">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
         </Borders>
         <Font ss:Bold="0"/>
	<Interior ss:Color="#f0ad4e" ss:Pattern="Solid"/>
      </Style>
     <Style ss:ID="error">
         <Borders>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left"/>
            <Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top"/>
         </Borders>
         <Font ss:Bold="0"/>
	<Interior ss:Color="#FF0000" ss:Pattern="Solid"/>
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
 <Worksheet ss:Name="Goods Movement Report">
  <Table ss:ExpandedRowCount="{count(//Row)+4}" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="15">


<Column  ss:Width="90"/>
<Column  ss:Width="90"/>
<Column  ss:Width="220"/>
<Column  ss:Width="90"/>
<Column  ss:Width="65"/>
<Column  ss:Width="45"/>
<Column  ss:Width="85"/>
<Column  ss:Width="90"/>
<Column  ss:Width="115"/>
<Column  ss:Width="103"/>
<Column  ss:Width="150"/>
<Column  ss:Width="100"/>

	<Row ss:AutoFitHeight="0">
    		<xsl:for-each select='//Label/*'>
			<Cell ss:Index="2" ss:MergeAcross="6" ss:StyleID="s76"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
		</xsl:for-each>
   	</Row>

	<Row>
		<xsl:for-each select='//Row[1]/*'>
			<Cell ss:id="{local-name()}" ss:StyleID="header"><Data ss:Type="String"><xsl:value-of select='local-name()'/></Data></Cell>
		</xsl:for-each>	
	</Row>

	<xsl:for-each select='//Row'>
	<Row>
	 <xsl:choose>



	<xsl:when  test="contains(Quantity, '-')">
   		<xsl:choose>
       		 <xsl:when  test="Status='E' ">
       		    <xsl:for-each select='./*'>
			<Cell ss:id="{local-name()}" ss:StyleID="error"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
	                 </xsl:for-each>
                          </xsl:when>
                          <xsl:otherwise>
                            <xsl:for-each select='./*'>
			<Cell ss:id="{local-name()}" ss:StyleID="red"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
	       	</xsl:for-each>
         </xsl:otherwise>
       </xsl:choose>
	</xsl:when>

	
         	<xsl:when  test="Status='E' ">
		<xsl:for-each select='./*'>
			<Cell ss:id="{local-name()}" ss:StyleID="error"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
		</xsl:for-each>
	</xsl:when>


	<xsl:when  test="string-length(Quantity) = 0">
		<xsl:for-each select='./*'>
			<Cell ss:id="{local-name()}"  ss:StyleID="label"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
		</xsl:for-each>
	</xsl:when>

	<xsl:otherwise>
		<xsl:for-each select='./*'>
			<Cell ss:id="{local-name()}" ss:StyleID="green"><Data ss:Type="String"><xsl:value-of select='string(.)'/></Data></Cell>
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