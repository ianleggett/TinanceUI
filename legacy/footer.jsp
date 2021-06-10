  <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
  
  <div class="modal fade" id="loginmodal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
                                                               
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header" style="text-align: center;"><img src="resources/images/tinance3-sm.png" style="width: 250px;" class="d-inline-block align-top" alt="">                                    	
                                    	<h3 class="text-center font-weight-light my-4">Trade Finance Login</h3>
                                    </div>
                                    <div class="card-body">
                                        <form method="POST" name='f' action="login">
                                            <div class="form-group ${error != null ? 'has-error' : ''}">
                                            <br /> <span>${message}</span>
                                                <label class="small mb-1" for="username">Username</label>
                                                <input name="username" id="username"type="text" class="form-control py-4" placeholder="Enter username" autofocus="autofocus" /> 
                                            </div>
                                            <div class="form-group">
                                                <label class="small mb-1" for="password">Password</label>
                                                <input name="password" type="password" id="password" class="form-control py-4" placeholder="Enter password" />
                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                                                
                                            </div>
                                            <div style="text-align: center;">${error}</div>
                                            <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a class="small" href="password.html">Forgot Password?</a>
                                                <button class="btn btn-primary" type="submit">Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="card-footer text-center">
                                        <div class="small"><a href=#>Need an account? Sign up!</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small"> 
                            <div class="text-muted">(Version <spring:eval expression="@environment.getProperty('website.version')" />) Copyright &copy; Trade Finance tinance.com 2021</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
 
</body>
</html>