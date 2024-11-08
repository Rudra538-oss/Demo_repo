<!-- This XSL is not used anymore, the html is created in the createTable function in Transfer Stock.js -->
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 <xsl:template match="/">
 <html>
  <body>
  <h2>My CD Collection</h2>
  <table border="1">
    <tr bgcolor="#9acd32">
      <th>MATERIAL</th>
      <th>BATCH</th>
      <th>SSCE</th>
      <th>Sbin</th>
      <th>SType</th>
      <th>SLed</th>
      <th>Qty</th>
      <th style="display:none">PLANT</th>
      <th style="display:none">WHSENUMBER</th>
      <th style="display:none">STGE LOC</th>
      <th style="display:none">BASE UOM</th>
      <th style="display:none">Error</th>
      <th></th>	
    </tr>
    <xsl:for-each select="Rowsets/Rowset/Row">
    <tr>
      <td><xsl:value-of select="MATERIAL"/></td>
      <td><xsl:value-of select="BATCH"/></td>
      <td><xsl:value-of select="STOR_UNIT"/></td>
      <td><xsl:value-of select="STGE_BIN"/></td>
      <td><xsl:value-of select="STGE_TYPE"/></td>
      <td><xsl:value-of select="EXPIRYDATE"/></td>
      <td><xsl:value-of select="AVAIL_STCK"/></td>
      <td style="display:none"><xsl:value-of select="PLANT"/></td>
      <td style="display:none"><xsl:value-of select="WHSENUMBER"/></td>
      <td style="display:none"><xsl:value-of select="STGE_LOC"/></td>
      <td style="display:none"><xsl:value-of select="BASE_UOM"/></td>
      <td style="display:none"><xsl:value-of select="ErrorMessage"/></td>
      <td><button type="button" style="cursor:pointer" onclick="doSelect(this)"> Select </button></td>
    </tr>
    </xsl:for-each>
  </table>
  </body>
  </html>
 </xsl:template>
</xsl:stylesheet>
