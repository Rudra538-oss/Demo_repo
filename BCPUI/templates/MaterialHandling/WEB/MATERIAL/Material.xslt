<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:template match="/">
		<xsl:for-each select="/MATMAS05/IDOC/E1MARAM">
			<MaterialHeader>
				<id>
					<client>
						<xsl:value-of select="/MATMAS05/IDOC/EDI_DC40/MANDT" />
					</client>
					<matnr>
						<!--<xsl:value-of select="MATNR" /> -->
						<xsl:choose>
	       		 			<xsl:when test="MATNR_LONG!=''">
								<xsl:call-template name="remove-leading-zeros">
									<xsl:with-param name="text" select="MATNR_LONG"/>
								</xsl:call-template>
	       		 			</xsl:when>
	       		 			<xsl:otherwise>
								<xsl:call-template name="remove-leading-zeros">
									<xsl:with-param name="text" select="MATNR"/>
								</xsl:call-template>
	       		 			</xsl:otherwise>
	       		 		</xsl:choose>
					</matnr>
				</id>
				<mtart>
					<xsl:value-of select="MTART" />
				</mtart>
				<meins>
					<xsl:value-of select="MEINS" />
				</meins>
				<matkl>
					<xsl:value-of select="MATKL" />
				</matkl>
				<xchpf>
					<xsl:value-of select="XCHPF" />
				</xchpf>
				<xsl:for-each select="E1MAKTM">
					<materialText>
						<id>
							<client>
								<xsl:value-of select="/MATMAS05/IDOC/EDI_DC40/MANDT" />
							</client>
							<matnr>
								<xsl:choose>
	       		 					<xsl:when test="/MATMAS05/IDOC/E1MARAM/MATNR_LONG!=''">
										<!--<xsl:value-of select="/MATMAS05/IDOC/E1MARAM/MATNR" /> -->
										<xsl:call-template name="remove-leading-zeros">
											<xsl:with-param name="text" select="/MATMAS05/IDOC/E1MARAM/MATNR_LONG"/>
										</xsl:call-template>
									</xsl:when>
									<xsl:otherwise>
										<xsl:call-template name="remove-leading-zeros">
											<xsl:with-param name="text" select="/MATMAS05/IDOC/E1MARAM/MATNR"/>
										</xsl:call-template>
	       		 					</xsl:otherwise>
	       		 				</xsl:choose>
							</matnr>
							<spras>
								<xsl:value-of select="SPRAS" />
							</spras>
						</id>
						<msgfn>
							<xsl:value-of select="MSGFN" />
						</msgfn>
						<maktx>
						<xsl:variable name="MATDESC" select="MAKTX"/>
						<xsl:choose>
						
	       		 					<xsl:when test="contains($MATDESC, '#')">
									
								<xsl:value-of select="substring-before($MATDESC,'#')"/>
								<xsl:value-of select="substring-after($MATDESC,'#')"/>
			   
						</xsl:when>
									<xsl:otherwise>
							<xsl:value-of select="MAKTX" />
							</xsl:otherwise>
							</xsl:choose>
						</maktx>
						<spras_iso>
							<xsl:value-of select="SPRAS_ISO" />
						</spras_iso>
					</materialText>
				</xsl:for-each>
				<xsl:for-each select="E1MARMM">
					<materialAltUOM>
						<id>
							<client>
								<xsl:value-of select="/MATMAS05/IDOC/EDI_DC40/MANDT" />
							</client>
							<matnr>
								<xsl:choose>
	       		 					<xsl:when test="/MATMAS05/IDOC/E1MARAM/MATNR_LONG!=''">
										<!--<xsl:value-of select="/MATMAS05/IDOC/E1MARAM/MATNR" /> -->
										<xsl:call-template name="remove-leading-zeros">
											<xsl:with-param name="text" select="/MATMAS05/IDOC/E1MARAM/MATNR_LONG"/>
										</xsl:call-template>
									</xsl:when>
									<xsl:otherwise>
										<xsl:call-template name="remove-leading-zeros">
											<xsl:with-param name="text" select="/MATMAS05/IDOC/E1MARAM/MATNR"/>
										</xsl:call-template>
	       		 					</xsl:otherwise>
	       		 				</xsl:choose>
							</matnr>
							<meinh>
								<xsl:value-of select="MEINH" />
							</meinh>
						</id>
						<msgfn>
							<xsl:value-of select="MSGFN" />
						</msgfn>
						<umrez>
							<xsl:value-of select="UMREZ" />
						</umrez>
						<umren>
							<xsl:value-of select="UMREN" />
						</umren>
						<ean11>
							<xsl:value-of select="EAN11" />
						</ean11>
						<numtp>
							<xsl:value-of select="NUMTP" />
						</numtp>
						<laeng>
							<xsl:value-of select="LAENG" />
						</laeng>
						<breit>
							<xsl:value-of select="BREIT" />
						</breit>
						<hoehe>
							<xsl:value-of select="HOEHE" />
						</hoehe>
						<meabm>
							<xsl:value-of select="MEABM" />
						</meabm>
						<volum>
							<xsl:value-of select="VOLUM" />
						</volum>
						<voleh>
							<xsl:value-of select="VOLEH" />
						</voleh>
						<brgew>
							<xsl:value-of select="BRGEW" />
						</brgew>
						<gewei>
							<xsl:value-of select="GEWEI" />
						</gewei>
						<mesub>
							<xsl:value-of select="MESUB" />
						</mesub>
						<gtin_variant>
							<xsl:value-of select="GTIN_VARIANT" />
						</gtin_variant>
					</materialAltUOM>
				</xsl:for-each>
				<xsl:for-each select="E1MARCM">
					<materialPlant>
						<id>
							<client>
								<xsl:value-of select="/MATMAS05/IDOC/EDI_DC40/MANDT" />
							</client>
							<matnr>
								<xsl:choose>
	       		 					<xsl:when test="/MATMAS05/IDOC/E1MARAM/MATNR_LONG!=''">
										<!--<xsl:value-of select="/MATMAS05/IDOC/E1MARAM/MATNR" /> -->
										<xsl:call-template name="remove-leading-zeros">
											<xsl:with-param name="text" select="/MATMAS05/IDOC/E1MARAM/MATNR_LONG"/>
										</xsl:call-template>
									</xsl:when>
									<xsl:otherwise>
										<xsl:call-template name="remove-leading-zeros">
											<xsl:with-param name="text" select="/MATMAS05/IDOC/E1MARAM/MATNR"/>
										</xsl:call-template>
	       		 					</xsl:otherwise>
	       		 				</xsl:choose>
							</matnr>
							<plant>
								<xsl:value-of select="WERKS" />
							</plant>
						</id>
						<msgfn>
							<xsl:value-of select="MSGFN" />
						</msgfn>
						<xchpf>
							<xsl:value-of select="XCHPF" />
						</xchpf>
						<rgekz>
							<xsl:value-of select="RGEKZ" />
						</rgekz>
						<sernp>
							<xsl:value-of select="SERNP" />
						</sernp>
						<sobsl>
							<xsl:value-of select="SOBSL" />
						</sobsl>
						<xsl:for-each select="E1MARDM">
							<materialStorageLocation>
								<id>
									<client>
										<xsl:value-of select="/MATMAS05/IDOC/EDI_DC40/MANDT" />
									</client>
									<matnr>
										<xsl:choose>
	       		 							<xsl:when test="/MATMAS05/IDOC/E1MARAM/MATNR_LONG!=''">
												<!--<xsl:value-of select="/MATMAS05/IDOC/E1MARAM/MATNR" /> -->
												<xsl:call-template name="remove-leading-zeros">
													<xsl:with-param name="text" select="/MATMAS05/IDOC/E1MARAM/MATNR_LONG"/>
												</xsl:call-template>
											</xsl:when>
											<xsl:otherwise>
												<xsl:call-template name="remove-leading-zeros">
													<xsl:with-param name="text" select="/MATMAS05/IDOC/E1MARAM/MATNR"/>
												</xsl:call-template>
	       		 							</xsl:otherwise>
	       		 						</xsl:choose>	
									</matnr>
									<plant>
										<xsl:value-of select="current()/parent::node()/WERKS" />
									</plant>
									<lgort>
										<xsl:value-of select="LGORT" />
									</lgort>
								</id>
								<msgfn>
									<xsl:value-of select="MSGFN" />
								</msgfn>
								<pstat>
									<xsl:value-of select="PSTAT" />
								</pstat>
								<lvorm>
									<xsl:value-of select="LVORM" />
								</lvorm>
								<diskz>
									<xsl:value-of select="DISKZ" />
								</diskz>
								<lsobs>
									<xsl:value-of select="LSOBS" />
								</lsobs>
								<lminb>
									<xsl:value-of select="LMINB" />
								</lminb>
								<lbstf>
									<xsl:value-of select="LBSTF" />
								</lbstf>
								<herkl>
									<xsl:value-of select="HERKL" />
								</herkl>
								<lgpbe>
									<xsl:value-of select="LGPBE" />
								</lgpbe>
								<prctl>
									<xsl:value-of select="PRCTL" />
								</prctl>
								<lwmkb>
									<xsl:value-of select="LWMKB" />
								</lwmkb>
							</materialStorageLocation>
						</xsl:for-each>
					</materialPlant>
				</xsl:for-each>
			</MaterialHeader>
		</xsl:for-each>
	</xsl:template>
	<xsl:template name="remove-leading-zeros">
	    <xsl:param name="text"/>
	    <xsl:choose>
	        <xsl:when test="starts-with($text,'0')">
	            <xsl:call-template name="remove-leading-zeros">
	                <xsl:with-param name="text"
	                    select="substring-after($text,'0')"/>
	            </xsl:call-template>
	        </xsl:when>
	        <xsl:otherwise>
	            <xsl:value-of select="$text"/>
	        </xsl:otherwise>
	    </xsl:choose>
	</xsl:template>
</xsl:stylesheet>