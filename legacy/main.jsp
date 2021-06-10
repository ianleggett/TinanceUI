<%@page contentType="text/html" pageEncoding="UTF-8"%>

<jsp:include page="header.jsp" />
<jsp:include page="menu.jsp" />
 <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
 <script type="text/javascript" src="https://unpkg.com/web3modal@1.9.0/dist/index.js"></script>
 <script type="text/javascript" src="https://unpkg.com/evm-chains@0.2.0/dist/umd/index.min.js"></script>
 <script type="text/javascript" src="https://unpkg.com/@walletconnect/web3-provider@1.2.1/dist/umd/index.min.js"></script>
 <script type="text/javascript" src="https://unpkg.com/fortmatic@2.0.6/dist/fortmatic.js"></script>    
<script src="resources/js/trade_logic.js"></script>
<script src="resources/js/bundle.js"></script>

<script type="text/javascript">	

 var csrfname="${_csrf.parameterName}";
 var csrfvalue="${_csrf.token}";  

</script>

<div class="alert alert-light" role="alert" id="alertbar">	
</div>

<div class="container g-2">
	<div id="mainDiv"></div>
</div>


<!-- Modal -->
<div class="modal fade" id="showwallet" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Wallet details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div id="connected" style="display: none">
            <div id="network">
              <p>
                <strong>Connected blockchain:</strong> <span id="network-name"></span>
              </p>
              <p>
                <strong>Selected account:</strong> <span id="selected-account"></span>
              </p>
            </div>
            <hr>
            <h3>All account balances</h3>
            <table class="table table-listing">
              <thead>
                <th>Address</th>
                <th>ETH balance</th>
              </thead>
              <tbody id="accounts">
              </tbody>
            </table>            
          </div>
        <div id="templates" style="display: none">
     	<template id="template-balance">
       <tr>
         <th class="address"></th>
         <td class="balance"></td>
       </tr>
     </template>
   </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal">OK</button>        
      </div>
    </div>
  </div>
</div>

<!-- 
				CREATE NEW OFFER DISPLAY
-->

<div class="card-body topCard zaraCard" id="newofferdiv1" style="display: none">
	<ul class="nav nav-tabs" id="myTab" role="tablist">
		<li class="nav-item" role="presentation">
			<button class="nav-link active" id="home-tab" data-bs-toggle="tab"
				data-bs-target="#home" type="button" role="tab" aria-controls="home"
				aria-selected="true">
				Offer <img src="/resources/images/arrow.png" class="arrow" />
			</button>

		</li>
		<li class="nav-item" role="presentation">
			<button class="nav-link" id="payment-tab" data-bs-toggle="tab"
				data-bs-target="#payment" type="button" role="tab"
				aria-controls="payment" aria-selected="false">
				Payment details <img src="/resources/images/arrow.png" class="arrow" />
			</button>
		</li>
		<li class="nav-item" role="presentation">
			<button class="nav-link" id="details-tab" data-bs-toggle="tab"
				data-bs-target="#details" type="button" role="tab"
				aria-controls="details" onclick="validateForm()"
				aria-selected="false">
				Trade size
			</button>
		</li>		
	</ul>
	<div class="tab-content" id="myTabContent">
		<div class="tab-pane fade show active" id="home" role="tabpanel"
			aria-labelledby="home-tab">
			<h1>Create an offer</h1>
			<hr>

			<div class="container tradeItem">
				<div class="row">
					<div class="col-sm">You'll send</div>
					<div class="col-sm">You'll receive</div>
				</div>
				<div class="row">
					<div class="col-sm" style="text-align: right;">
						<div class="dropdown currCode">
							<div class="dropdown-toggle" id="dropdownCurr1"
								data-bs-toggle="dropdown" aria-haspopup="true"
								aria-expanded="false">USDT</div>
							<div class="dropdown-menu" id="fromccy" aria-labelledby="dropdownCurr1">
														
							</div>
						</div>
					</div>
					<div class="col-sm">
						<input type="text" oninput="calcOfferDetails(this)" id="amtsell" placeholder="0.00" class="currCode" />
					</div>
					<div class="col-sm" onclick="swapSides()" > 
						<i class="fas fa-exchange-alt"></i>
					</div>
					<div class="col-sm" style="text-align: right;">
						<div class="dropdown currCode">
							<div class="dropdown-toggle" id="dropdownCurr2"
								data-bs-toggle="dropdown" aria-haspopup="true"
								aria-expanded="false">VND</div>
							<div class="dropdown-menu" id="toccy" aria-labelledby="dropdownCurr2">								
							</div>
						</div>
					</div>
					<div class="col-sm">
						<input type="text"  oninput="calcOfferDetails(this)" id="amtbuy" placeholder="0.00" class="currCode" />
					</div>
				</div>
				<hr>
				<div class="row">
					<div class="col-sm"><label>Exch Rate : &nbsp</label><label id="exchrate"></label></div>
					<div class="col-sm"><label>Fee : &nbsp</label><label id="amtfee"></label></div>
				</div>	
			<hr>
			<button type="button" class="btn btn-light float-end"
				onclick="$('#payment-tab').click();">Next >></button>
		</div>
		</div>
		<div class="tab-pane fade" id="payment" role="tabpanel"
			aria-labelledby="payment-tab">
		
			<h5>Payment methods</h5>
			<div id="paymethods"></div>
			<hr>
			<button type="button" class="btn btn-light float-end"
				onclick="$('#details-tab').click();">Next >></button>
				
		</div>
		<div class="tab-pane fade" id="details" role="tabpanel"
			aria-labelledby="details-tab">
			<h5>Trade sizes</h5>
			<div class="input-group mb-3">
				<span class="input-group-text">Min trade</span><label
					for="ccyqtybuy" id="mintradelabel"></label> <input name="mintrade"
					type="text" class="form-control" placeholder="amount" id="mintrade"
					aria-label="amtbuy" aria-describedby="mintrade">
			</div>

			<div class="input-group mb-3">
				<span class="input-group-text">Max trade</span><label
					for="ccyqtybuy" id="maxtradelabel"></label> <input name="maxtrade"
					type="text" class="form-control" placeholder="amount" id="maxtrade"
					aria-label="amtbuy" aria-describedby="ccytype">
			</div>
			<hr>
			<button type="button" id="offervalid"
				class="btn btn-light float-end" onclick="placeOrder();">Publish
				Offer >></button>
		</div>
	</div>
</div>
<div class="card-body bottomCard zaraCard" id="newofferdiv2" style="display: none">
	<i class="far fa-clock"> </i> Expires in <input type="text" id="expiry" placeholder="1" class="expNum" />
	<select name="expUnit" id="expUnit" class="expSelect">
    	<option value="minute" id="minute">Minute</option>
    	<option value="day" id="hour" selected>Hour</option>
    	<option value="day" id="day">Day</option>
    	<option value="week" id="week">Week</option>
    	<option value="month" id="month">Month</option>
  	</select>

</div>

<!-- 
				PRE TRADE DISPLAY
-->

<div class="container-fluid" id="pretrade" style="display: none;">
	<div class="d-flex">
		<div class="card zaraCard">
			<div class="card-header bg-primary font-weight-bold text-light" style="line-height: 31px;">
				<i class="fas fa-chart-area me-1"></i> Trader
			</div>
			<div class="card-body">
				<canvas id="userdetails" width="100%" height="10"></canvas>
				<jsp:include page="components/user_public.jsp" />
			</div>
			<div class="card-header bg-primary font-weight-bold text-light" style="line-height: 31px;">
				<i class="fas fa-chart-bar me-1"></i> Recent Trades
			</div>
			<div class="card-body" id="recenttrades">
			</div>
		</div>
		<div class="card zaraCard">
			<div class="card-header bg-primary font-weight-bold text-light" id="thisoffer"></div>
			<div class="card-body">
				
				<label for="setAmount" class="form-label">Exchange rate <span id="exchrate"></span></label>
				
				<!-- input type="range" class="form-range" min="0" max="" step="1" id="setAmount" oninput="showAmt(this.value)" onchange="showAmt(this.value)"-->
				<div class="input-group mb-3">
					<span class="input-group-text" id="ccytypesell">not set</span><label for="ccyqtysell" id="ccyqtysell"></label> <input oninput="calc(this)"
						name="preamtsell" type="text" class="form-control" placeholder="amount" id="preamtsell" aria-label="amt" aria-describedby="ccytype">
				</div>
				<div class="input-group mb-3">
					<span class="input-group-text" id="ccytypebuy">not set</span><label for="ccyqtybuy" id="ccyqtybuy"></label> <input oninput="calc(this)"
						name="preamtbuy" type="text" class="form-control" placeholder="amount" id="preamtbuy" aria-label="amt" aria-describedby="ccytype">
				</div>
				<!-- div class="btn-group" role="group" id="paygroup" aria-label="Basic checkbox toggle button group"></div-->
				<div class="card">
					<div id="paygroup" class="card-header bg-info">Payment methods</div>
					<div class="card-body" id="paydetail"></div>
				</div>
				<a href="#" style="float: right; margin-top: 20px;"
					class="btn btn-sm btn-outline-success font-weight-bold" onclick="agree()">Trade</a>
			</div>
		</div>	
	</div>
</div>

<!-- 
				TRADES DISPLAY  /// POST TRADE
-->
<div class="container g-2" id="posttrade" style="display: none;">
<br/>
	<div id="myorders"></div>
	<br /> 	
	<div id="orderDiv"></div>
</div>

<jsp:include page="components/msg_dialog.jsp" />

<jsp:include page="footer.jsp" />
