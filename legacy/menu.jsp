<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<sec:authentication var="principal" property="principal" />


<title><spring:eval
		expression="@environment.getProperty('website.title')" /></title>

<body onload="initscript()" class="container">

        <nav class="newNav">        	
        	<div class="logo">
	            <a class="navbar-brand" href="/"><img src="/resources/images/favicon.png" alt="" class="logoimg">Trade Finance</a>
			</div>
            <div class="navMenu flex-container">
            	<div class="menuItem">
            		<div class="dropdown-toggle" id="dropdownLang" data-bs-toggle="dropdown" aria-expanded="false">EN</div>
		             	<ul class="dropdown-menu dropdown-menu-middle">
						    <li><a class="dropdown-item">VN - Ti&#7871;ng Vi&#7879;t</a></li>
						    <li><a class="dropdown-item">CN - &#x4E2D;&#x6587; </a></li>						    
						</ul>
            		</div>            	
            	<div class="menuItem" onclick="browseOffers()">Browse</div>
            	<div class="menuItem">FAQ</div>
            	<div class="menuItem">Explorer</div>
            	<sec:authorize access="!isAuthenticated()">
            		<a class="menuItem" onclick="showlogin()" >Sign in</a>
            	</sec:authorize>
            	<sec:authorize access="isAuthenticated()">
            		<div id="btn-connect" class="menuItem menuGo">Connect</div>
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_USER'})">
    				<div class="menuItem" onclick="myOffers()">Offers</div>
    				<div class="menuItem" onclick="showMyTrades()">Trades</div>
                </sec:authorize>
				</sec:authorize>            	
            	
            	<div class="menuItem">
            		<div class="dropdown-toggle" id="dropdownMore" data-bs-toggle="dropdown" aria-expanded="false">More</div>
		             	<ul class="dropdown-menu dropdown-menu-end">
			             	<sec:authorize access="isAuthenticated()">							<sec:authorize access="hasAnyRole({'ROLE_ADMIN'})">
	    				 		<li><a class="dropdown-item" href="/system/admin_main"><i class="fas fa-cog"></i> System</a></li>
	    				 		<div class="dropdown-item" onclick="deleteTrades()"><i class="fas fa-trash-alt"></i> trades</div>    				 		
	                		</sec:authorize>
	                		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_USER'})">
	                		<li><a class="dropdown-item" href="/logout2"><i class="fas fa-sign-out-alt"></i> logout</a></li>
							</sec:authorize>
							</sec:authorize>
						    <li><a class="dropdown-item"><i class="far fa-question-circle"></i> Support</a></li>
						    <li><a class="dropdown-item"><i class="fas fa-flask"></i> Request a feature</a></li>
						    <li><a class="dropdown-item"><i class="fas fa-balance-scale"></i> Terms & Conditions</a></li>
						    <li><a class="dropdown-item"><i class="fas fa-user-secret"></i> Privacy Policy</a></li>
						</ul>
            		</div>
            	<div class="menuItem menuMore">Kovan</div>
            </div>
		</nav>
  <main>           

	
