const BASECONTROLLER = require("./basecontroller");
const USERMODEL = require("../models/users_model").users;
const COMPANYMODEL = require("../models/users_model").companies;

exports.signup = async (req, res, next) => {
    const password = await BASECONTROLLER.jwt_encode(req.body.password);
    var EV = await BASECONTROLLER.email_verify(req.body.email);
    var UV = await BASECONTROLLER.username_verify(req.body.username);
    var CP = await BASECONTROLLER.confirm_password(req.body.password, req.body.confirmpassword);

    var date = (new Date()).valueOf()+'';
    var token = await BASECONTROLLER.md5convert(date);

    if (UV == true) {
        res.json({
            status: false,
            data: "Username already exists!"
        })
        return next();
    }

    if (CP == false) {
        res.json({
            status: false,
            data: "Password don't match!"
        })
        return next();
    }

    if (EV == true) {
        res.json({
            status: false,
            data: "Email already exists!"
        })
        return next();
    } else {
        var udata = await BASECONTROLLER.data_save({username: req.body.username, email: req.body.email, password: password, telephone: req.body.telephone }, USERMODEL)
            udata = await BASECONTROLLER.jwt_encode(udata);

            if (udata) {
                res.json({
                    status: true,
                    data: {
                        token : token,
                        user: udata,
                    }
                })
                return next();
            } else {
                res.json({
                    status: false,
                    data: "Server Error!"
                })
                return next();
            }
        }
}

exports.signin = async (req, res, next) => {
    const password = await BASECONTROLLER.jwt_encode(req.body.password);
    var UV = await BASECONTROLLER.username_verify(req.body.username);
    var PV = await BASECONTROLLER.password_verify(password);

    var date = (new Date()).valueOf()+'';
    var token = await BASECONTROLLER.md5convert(date);

    if (UV == false) {
        res.json({
            status: false,
            data: "Username not found!"
        })
        return next();
    } else if (PV == false) {
        res.json({
            status: false,
            data: "Incorrect password!"
        })
        return next();
    } else {
        var udata = await BASECONTROLLER.BfindOne(USERMODEL, {username: req.body.username});
        var cdata = await BASECONTROLLER.BfindOne(COMPANYMODEL, {_id: udata.id});
        udata = await BASECONTROLLER.jwt_encode(udata);

        res.json({
            status: true,
            data: {
                token : token,
                user : udata,
                company : cdata
            }
        })
        return next();
    }
}

exports.setPassword = async (req, res, next) => {
    const password = await BASECONTROLLER.jwt_encode(req.body.password);
    const _id = await BASECONTROLLER.jwt_decode(req.body.user_id);

    var data = await BASECONTROLLER.BfindOneAndUpdate(USERMODEL, {_id}, {password});

    if (data) {
        res.json({
            status: true,
        })
        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        return next();
    }
}

exports.loadEmployee = async (req, res, next) => {
    var adata = null;
    if (req.body.role === "admin") {
        adata = await BASECONTROLLER.Bfind(USERMODEL, {});
    } else {
        adata = await BASECONTROLLER.Bfind(USERMODEL, {responsable: req.body.user_id, id: req.body.company_id});
    }
    if (adata) {
        res.json({
            status: true,
            data: adata
        })
        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        return next();
    }
}

exports.addPerson = async (req, res, next) => {
    var EV = await BASECONTROLLER.email_verify(req.body.email);

    if (EV) {
        res.json({
            status: false,
            data: "Email already exists!"
        })
        return next();
    } else {
        var sdata = await BASECONTROLLER.data_save({
            id: req.body.id,
            email: req.body.email,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            birthday: req.body.birthDay,
            position: req.body.position,
            department: req.body.department,
            role: req.body.role,
            responsable: req.body.responsable,
            centers: req.body.centers,
            calendar: req.body.calendar,
            agreement: req.body.agreement,
            schedule: req.body.schedule,
            start: req.body.startDay,
            end: req.body.endDay
        }, USERMODEL);
        if (sdata) {
            var u_id = await BASECONTROLLER.jwt_encode(sdata._id);
            var url = "https://timeclick360.com/set-password:" + u_id;
            var html = "<!doctype html><html xmlns=http://www.w3.org/1999/xhtml xmlns:v=urn:schemas-microsoft-com:vml xmlns:o=urn:schemas-microsoft-com:office:office><head><title></title><meta http-equiv=X-UA-Compatible content=\"IE=edge\"><meta http-equiv=Content-Type content=\"text/html; charset=UTF-8\"><meta name=viewport content=\"width=device-width, initial-scale=1\"></head><body style=background-color:#FFFFFF><div style='margin:0;padding:0'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td bgcolor='#3382DF'><div style='display:none;font-size:1px;color:#fefefe;line-height:1px;font-family:Helvetica,Arial,sans-serif;max-height:0px;max-width:0px;opacity:0;overflow:hidden'></div><div align='center' style='padding:0px 15px 0px 15px'><table border='0' cellpadding='0' cellspacing='0' width='500'><tbody><tr><td style='padding:20px 0px 30px 0px'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td bgcolor='#3382DF' width='100' align='left'><a href='https://timeclick360.com' target='_blank' ><img alt='TimeClick360.' src='https://ci3.googleusercontent.com/proxy/qZNZHi4W3Xwhv__cdgkvxJoEPNA7kU49ikG74OoNak0uoRckotZn8OE6QVG_T51q_b6XVlE1D4z5fdJ5j7nOF3sHcsyJKsmHpogLBQ=s0-d-e1-ft#https://app.woffu.com/styles/general/files/woffu-logo.png' width='120' style='display:block;font-family:Helvetica,Arial,sans-serif;color:#dadfe3;font-size:16px' border='0' class='CToWUd'></a></td><td bgcolor='#3382DF' width='400' align='right'><table border='0' cellpadding='0' cellspacing='0'><tbody><tr><td align='right' style='padding:0 0 5px 0;font-size:14px;font-family:Arial,sans-serif;color:#666666;text-decoration:none'><span style='color:#ffffff;text-decoration:none'></span></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td bgcolor='#ffffff' align='center' style='padding:0 15px 70px 15px'><table border='0' cellpadding='0' cellspacing='0' width='500' style='padding:0 0 20px 0'><tbody><tr><td style='padding:40px 0 0 0'><table border='0' cellspacing='0' cellpadding='0' width='100%'><tbody><tr><td align='left' style='padding:0 0 5px 25px;font-size:16px;font-family:Helvetica,Arial,sans-serif;font-weight:normal;color:#666666'>Hola " + sdata.first_name + " " + sdata.last_name + ",</td></tr><tr><td align='left' style='padding:10px 0 15px 25px;font-size:16px;line-height:24px;font-family:Helvetica,Arial,sans-serif;color:#666666'><p>Gracias por tu tiempo e interés en TimeClick360.com, la plataforma más completa en la gestión del tiempo de los empleados.</p><p>Dispones de 15 días de prueba gratuita, para sacarle el máximo provecho, puedes consultar nuestro Centro de Ayuda y utilizar el chat interno para cualquier consulta.</p><p>También puedes llamarnos al +34 67 956 22 91, estaremos encantados de contarte más.</p></td></tr><tr><td align='left' style='padding:0 0 0 25px;font-size:16px;line-height:24px;font-family:Helvetica,Arial,sans-serif;color:#666666'><p>¿Te animas a optimizar la gestión del tiempo?</p></td></tr><tr><td align='left' style='padding:20px 0 0px 25px;font-size:16px;line-height:24px;font-family:Helvetica,Arial,sans-serif;color:#666666'>Un saludo, <br>Equipo TimeClick360.com</td></tr><tr><td><table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td align='center'><table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td align='center' style='padding:0'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td align='center'><a href=" + url + " style='font-size:18px;font-family:Helvetica,Arial,sans-serif;font-weight:normal;color:#ffffff;text-decoration:none;background-color:#256f9c;border-top:15px solid #256f9c;border-bottom:15px solid #256f9c;border-left:25px solid #256f9c;border-right:25px solid #256f9c;border-radius:3px;display:inline-block' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://noempresa.woffu.com/%23/to/ymYeTQzZ3%252bWDT9wdl3YpnODvXYHgFF9EN9lijvf9HpYQQ1yk%252fmNTLxlNsgNg6qcYTOTxTiu5o9vxMhwyPBTXxVtGMa9b2grTh01AsXjN8FuqJ2W%252boyj27w%253d%253d&amp;source=gmail&amp;ust=1609951329526000&amp;usg=AFQjCNFL2mQUWLseFCWEHBM4yaWWxKVrZA'>Entrar</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td bgcolor='#ffffff' align='center' style='padding:10px 15px 0px 15px'><table border='0' cellpadding='0' cellspacing='0' width='500'></table></td></tr></tbody></table><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td bgcolor='#ffffff' align='center' style='padding:20px 0px'><table width='500' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td align='center' valign='middle' style='font-size:12px;line-height:18px;font-family:Helvetica,Arial,sans-serif;color:#666666'><span class='m_7002473367547618008appleFooter' style='color:#666666'>TimeClick360 © 2018 - Barcelona</span></td></tr></tbody></table></td></tr></tbody></table><img src='https://ci4.googleusercontent.com/proxy/vuao3XcWMqx7YZ3kfHTJt5UF8MHoBblF3EXY9zP9Pc_zqp3acKuIXl2k0f1Tniob_l3GFdX8D6WHqMOWITkD827a7D-92StlVOxeeHAzAWaWXOQaHmUf5qB_xNp4MNWjTWejewI5vAUHzo7_JsQ2SDH3PSxaWAvLeLm0ldwmZk9d_LxzNJLwtYO61mwDeobp_W4so5nJOnvuQmqyhNKYBcq2vbbyLOJHANrh8o-KJFnHuaVlN0v89vyRhKjmZhJqAa7i2xWUZZqG3WO3_0MIXf4Bpb49-3lFkQlwKYvrRgDeXTkSdu6RkbJnE3JuR_kQ69cE6ZxsanJYwGUTXKiPy-tFCHevCy-vEL2dnAGfO0do-eYDmuQmmQ9qCr-OEkPpsueqxoI-7CLpke1lRQv1GkLue1W5M74IPXaz=s0-d-e1-ft#https://u3631008.ct.sendgrid.net/wf/open?upn=kZP10ltSK7S-2Fd3kCUp4BhFyPAvH0j8niTBnm-2BD06-2BdJGY2hP4VicfTn7ZbjZEtxjLMFICGJz2TvHc3hZebC0qBmfsU4f8WsqC7s93kPeCptilYZOsQkCx-2FA4inXOr0Mjx4loU91CYmHEi86wYzjwHzMULgmSb3xGnU84bIbsREkVG4hE7dN3oNa9sJ7WRnyx-2BOkuPCi7Ni0teqyrNFqOcCUtLZkkT8V-2B3SEC5cVeni4-3D' alt=' width='1' height='1' border='0' style='height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important' class='CToWUd'><div class='yj6qo'></div></div></body></html>";

            var subject = "Por favor establezca su contraseña!"

            var mail = await BASECONTROLLER.sendEmail(req.body.email, html, subject)

            if (mail) {
                var adata = await BASECONTROLLER.Bfind(USERMODEL, {});
                if (adata) {
                    res.json({
                        status: true,
                        data: adata
                    })
                    return next();
                } else {
                    res.json({
                        status: false,
                        data: "SERVER ERROR!"
                    })
                    return next();
                }
            } else {
                res.json({
                    status: false,
                    data: "Email sending Faild!"
                })
                return next();
            }

        } else {
            res.json({
                status: false,
                data: "SERVER ERROR!"
            })
            return next();
        }
    }
}

exports.updatePerson = async (req, res, next) => {
    var data = await BASECONTROLLER.BfindOneAndUpdate(USERMODEL, {_id: req.body.user_id}, {
        id: req.body.id,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        birthday: req.body.birthDay,
        position: req.body.position,
        department: req.body.department,
        role: req.body.role,
        responsable: req.body.responsable,
        centers: req.body.centers,
        calendar: req.body.calendar,
        agreement: req.body.agreement,
        schedule: req.body.schedule,
        start: req.body.startDay,
        end: req.body.endDay
    });
    if (data) {
        var adata = await BASECONTROLLER.Bfind(USERMODEL, {});

        res.json({
            status: true,
            data: adata
        })
        return next();
    } else {
        res.json({ 
            status: false,
            data: "SERVER ERROR!"
        })
    }
}

exports.deletePerson = async (req, res, next) => {
    var data = await BASECONTROLLER.BfindOneAndDelete(USERMODEL, {_id: req.body.id});
    if (data) {
        var adata = await BASECONTROLLER.Bfind(USERMODEL, {});

        res.json({
            status: true,
            data: adata
        })

        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        
        return next();
    }
}

exports.suspendPerson = async (req, res, next) => {
    var data = await BASECONTROLLER.BfindOneAndUpdate(USERMODEL, {_id: req.body.id}, {allowed: req.body.allowed});
    if (data) {
        var adata = await BASECONTROLLER.Bfind(USERMODEL, {});

        res.json({
            status: true,
            data: adata
        })

        return next();
    } else {
        res.json({
            status: false,
            data: "SERVER ERROR!"
        })
        
        return next();
    }
}