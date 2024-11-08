<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 <xsl:template match="/">
 <Rowsets>
	<Rowset>

    <xsl:for-each select="Rowsets/Rowset/Row">
  	<Row>
	<MATERIAL><xsl:value-of select="number(MATERIAL)"/></MATERIAL>
	<BATCH><xsl:value-of select="BATCH"/></BATCH>
	<STGE_TYPE><xsl:value-of select="STGE_TYPE"/></STGE_TYPE>
	<STGE_BIN><xsl:value-of select="STGE_BIN"/></STGE_BIN>
	<BATCH_STATUS><xsl:value-of select="BATCH_STATUS"/></BATCH_STATUS>
	<EXPIRYDATE><xsl:value-of select="EXPIRYDATE"/></EXPIRYDATE>
	<AVAIL_STCK><xsl:value-of select="AVAIL_STCK"/></AVAIL_STCK>
	<STOR_UNIT><xsl:value-of select="STOR_UNIT"/></STOR_UNIT>
	<STOCK_CAT><xsl:value-of select="STOCK_CAT"/></STOCK_CAT>
	<PLANT><xsl:value-of select="PLANT"/></PLANT>
	<BASE_UOM><xsl:value-of select="BASE_UOM"/></BASE_UOM>
	</Row>
    </xsl:for-each>
  </Rowset>
  </Rowsets>
 </xsl:template>
</xsl:stylesheet>