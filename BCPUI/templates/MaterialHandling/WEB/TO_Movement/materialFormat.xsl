<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 <xsl:template match="/">
 <Rowsets>
	<Rowset>

    <xsl:for-each select="Rowsets/Rowset/Row">
  	<Row>
	<MATERIAL><xsl:value-of select="number(MATERIAL)"/></MATERIAL>
	</Row>
    </xsl:for-each>
  </Rowset>
  </Rowsets>
 </xsl:template>
</xsl:stylesheet>