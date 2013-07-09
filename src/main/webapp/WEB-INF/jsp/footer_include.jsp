<?xml version="1.0" encoding="UTF-8" ?>
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page"
	xmlns:fmt="http://java.sun.com/jsp/jstl/fmt" version="2.1">
	<jsp:directive.page contentType="text/html; charset=UTF-8"
		pageEncoding="UTF-8" session="false" trimDirectiveWhitespaces="false" />

	<fmt:setBundle basename="LabelsBundle" />
	<!-- 
	include bestand met de header tags, 
	let op dat dit bestand vanuit de root van de webapplicatie wordt ingevoegd  
	 -->
	<jsp:text>
		<div id="footerWrapper">	
			<span class="introduction"><fmt:message key="KEY_COPYRIGHT" /></span><!-- 
			<ul>
				<li><a href="http://www.cbs.nl"><fmt:message key="KEY_FOOTER_CONTACT" /></a></li>
				<li><a href="http://www.cbs.nl"><fmt:message key="KEY_FOOTER_DISCLAIMER" /></a></li>
				<li><a href="http://www.cbs.nl"><fmt:message key="KEY_FOOTER_SITEMAP" /></a></li>
				<li class="goTop"><a href="#top"><span><fmt:message key="KEY_FOOTER_LINKTOP" /></span></a></li>
			</ul> -->
		</div>
	</jsp:text>
</jsp:root>