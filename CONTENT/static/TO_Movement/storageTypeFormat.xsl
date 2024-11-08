<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 <xsl:template match="/">
 <Rowsets>
	<Rowset>
<Row>
		<STGE_TYPE>ALL</STGE_TYPE>
		</Row>
    <xsl:for-each select="Rowsets/Rowset/Row">
  	<Row>
	<STGE_TYPE><xsl:value-of select="STGE_TYPE"/></STGE_TYPE>
	</Row>
    </xsl:for-each>
  </Rowset>
  </Rowsets>
 </xsl:template>
</xsl:stylesheet>