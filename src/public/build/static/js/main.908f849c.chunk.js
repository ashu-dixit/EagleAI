(this.webpackJsonpbechu=this.webpackJsonpbechu||[]).push([[0],{65:function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),c=t(27),r=t.n(c),o=t(1),s=t(5),m=t(28),i=t(29),u=t(33),d=t(32),E=t(2);function b(){var e=Object(E.h)(),a=Object(l.useContext)(D).dispatch,t=Object(l.useCallback)((function(){return e.push("/")}),[e]),c=Object(l.useCallback)((function(){return e.push("/login")}),[e]);return n.a.createElement("div",null,n.a.createElement("nav",{className:"sb-topnav navbar navbar-expand navbar-light bg-clr"},n.a.createElement("a",{className:"navbar-brand logo-brand"},"Big Supermarket"),n.a.createElement("button",{className:"btn btn-link btn-sm order-1 order-lg-0",id:"sidebarToggle"},n.a.createElement("i",{className:"fas fa-bars"})),n.a.createElement("a",{onClick:t,className:"frnt-link"},n.a.createElement("i",{className:"fas fa-external-link-alt"}),"Home"),n.a.createElement("ul",{className:"navbar-nav ml-auto mr-md-0"},n.a.createElement("li",{className:"nav-item dropdown"},n.a.createElement("a",{className:"nav-link dropdown-toggle",id:"userDropdown",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},n.a.createElement("i",{className:"fas fa-user fa-fw"})),n.a.createElement("div",{className:"dropdown-menu dropdown-menu-right","aria-labelledby":"userDropdown"},n.a.createElement("span",{onClick:function(){a({type:"LOGOUT"})},className:"dropdown-item admin-dropdown-item"},"Logout"),n.a.createElement("span",{onClick:c,className:"dropdown-item admin-dropdown-item"},"Login"))))))}var p=t(3),h=t.n(p);function v(e){var a=Object(l.useContext)(D).state,t=Object(E.h)(),c=Object(l.useCallback)((function(){return t.push("/order/edit")}),[t]);if(!1===a.isAuthenticated)return n.a.createElement(E.b,{to:"/login"});var r=Object(l.useState)([]),s=Object(o.a)(r,2),m=s[0],i=s[1],u=Object(l.useState)(0),d=Object(o.a)(u,2),b=d[0],p=d[1],v=Object(l.useState)(0),N=Object(o.a)(v,2),f=N[0],g=N[1],O=Object(l.useState)(0),y=Object(o.a)(O,2),j=y[0],S=y[1],C=Object(l.useState)(0),w=Object(o.a)(C,2),k=w[0],x=w[1],_=Object(l.useState)(0),I=Object(o.a)(_,2),P=I[0],A=(I[1],Object(l.useState)(0)),L=Object(o.a)(A,2),M=L[0],V=L[1];return Object(l.useEffect)((function(){h.a.get("/admin/orders",{headers:{Authorization:localStorage.getItem("token")}}).then((function(e){JSON.stringify(e.data),i(e.data.orders),console.log(e.data.data),e.data.data.forEach((function(e){"Pending"==e.status?g(e.c):"Canceled"==e.status?p(e.c):"Process"==e.status?S(e.c):"Delivered"==e.status?V(e.c):"Dispatched"==e.status&&x(e.c)}))})).catch((function(e){console.log(e)}))}),[]),n.a.createElement("div",{id:"layoutSidenav_content"},n.a.createElement("main",null,n.a.createElement("div",{className:"container-fluid"},n.a.createElement("h2",{className:"mt-30 page-title"},"Dashboard"),n.a.createElement("ol",{className:"breadcrumb mb-30"},n.a.createElement("li",{className:"breadcrumb-item active"},"Dashboard")),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-xl-4 col-md-6"},n.a.createElement("div",{className:"dashboard-report-card purple"},n.a.createElement("div",{className:"card-content"},n.a.createElement("span",{className:"card-title"},"Order Pending"),n.a.createElement("span",{className:"card-count"},f)),n.a.createElement("div",{className:"card-media"},n.a.createElement("i",{className:"fab fa-rev"})))),n.a.createElement("div",{className:"col-xl-4 col-md-6"},n.a.createElement("div",{className:"dashboard-report-card red"},n.a.createElement("div",{className:"card-content"},n.a.createElement("span",{className:"card-title"},"Order Cancel"),n.a.createElement("span",{className:"card-count"},b)),n.a.createElement("div",{className:"card-media"},n.a.createElement("i",{className:"far fa-times-circle"})))),n.a.createElement("div",{className:"col-xl-4 col-md-6"},n.a.createElement("div",{className:"dashboard-report-card info"},n.a.createElement("div",{className:"card-content"},n.a.createElement("span",{className:"card-title"},"Order Process"),n.a.createElement("span",{className:"card-count"},j)),n.a.createElement("div",{className:"card-media"},n.a.createElement("i",{className:"fas fa-sync-alt rpt_icon"})))),n.a.createElement("div",{className:"col-xl-4 col-md-6"},n.a.createElement("div",{className:"dashboard-report-card info"},n.a.createElement("div",{className:"card-content"},n.a.createElement("span",{className:"card-title"},"Dispatched"),n.a.createElement("span",{className:"card-count"},k)),n.a.createElement("div",{className:"card-media"},n.a.createElement("i",{className:"fas fa-money-bill rpt_icon"})))),n.a.createElement("div",{className:"col-xl-4 col-md-6"},n.a.createElement("div",{className:"dashboard-report-card success"},n.a.createElement("div",{className:"card-content"},n.a.createElement("span",{className:"card-title"},"Today Income"),n.a.createElement("span",{className:"card-count"},"\u20b9 ",P)),n.a.createElement("div",{className:"card-media"},n.a.createElement("i",{className:"fas fa-money-bill rpt_icon"})))),n.a.createElement("div",{className:"col-xl-4 col-md-6"},n.a.createElement("div",{className:"dashboard-report-card success"},n.a.createElement("div",{className:"card-content"},n.a.createElement("span",{className:"card-title"},"Delivered"),n.a.createElement("span",{className:"card-count"},M)),n.a.createElement("div",{className:"card-media"},n.a.createElement("i",{className:"fas fa-money-bill rpt_icon"})))),n.a.createElement("div",{className:"col-xl-12 col-md-12"},n.a.createElement("div",{className:"card card-static-2 mb-30"},n.a.createElement("div",{className:"card-title-2"},n.a.createElement("h4",null,"Recent Orders"),n.a.createElement("a",{onClick:c,className:"view-btn hover-btn"},n.a.createElement("i",{className:"fas fa-edit "}))),n.a.createElement("div",{className:"card-body-table"},n.a.createElement("div",{className:"table-responsive"},n.a.createElement("table",{className:"table ucp-table table-hover"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",{style:{width:150}},"Order ID"),n.a.createElement("th",{style:{width:100}},"Customer ID"),n.a.createElement("th",{style:{width:100}},"Product ID"),n.a.createElement("th",{style:{width:100}},"Product Q."),n.a.createElement("th",{style:{width:200}},"Status"),n.a.createElement("th",{style:{width:200}},"Delivery Date"),n.a.createElement("th",{style:{width:200}},"Order Date"))),n.a.createElement("tbody",null,m.map((function(e){return n.a.createElement("tr",{key:e.orderID+" "+e.Product_ID},n.a.createElement("td",null,e.orderID),n.a.createElement("td",null,e.User_ID),n.a.createElement("td",null,e.Product_ID),n.a.createElement("td",null,e.product_qty),n.a.createElement("td",null,e.status),n.a.createElement("td",null,e.delivery_date),n.a.createElement("td",null,"\u20b9",e.order_date))}))))))))))),n.a.createElement("footer",{className:"py-4 bg-footer mt-auto"},n.a.createElement("div",{className:"container-fluid"},n.a.createElement("div",{className:"d-flex align-items-center justify-content-between small"},n.a.createElement("div",{className:"text-muted-1"},n.a.createElement("b",null,"EagleAI Dashboard"),". by ",n.a.createElement("a",{href:"https://github.com/ashu-dixit"},"Ashutosh"))))))}function N(){var e=Object(E.h)(),a=Object(l.useCallback)((function(){return e.push("/")}),[e]),t=Object(l.useCallback)((function(){return e.push("/product/list")}),[e]),c=Object(l.useCallback)((function(){return e.push("/customer/list")}),[e]),r=Object(l.useCallback)((function(){return e.push("/vendor/list")}),[e]),o=Object(l.useCallback)((function(){return e.push("/product/create")}),[e]),s=Object(l.useCallback)((function(){return e.push("/product/edit")}),[e]),m=Object(l.useCallback)((function(){return e.push("/customer/edit")}),[e]),i=(Object(l.useCallback)((function(){return e.push("/order/edit")}),[e]),Object(l.useCallback)((function(){return e.push("/Vendor/edit")}),[e]));return n.a.createElement("div",{id:"layoutSidenav_nav"},n.a.createElement("nav",{className:"sb-sidenav accordion sb-sidenav-dark",id:"sidenavAccordion"},n.a.createElement("div",{className:"sb-sidenav-menu"},n.a.createElement("div",{className:"nav"},n.a.createElement("a",{className:"nav-link active",onClick:a},n.a.createElement("div",{className:"sb-nav-link-icon"},n.a.createElement("i",{className:"fas fa-tachometer-alt"})),"Dashboard"),n.a.createElement("a",{className:"nav-link collapsed",href:"#","data-toggle":"collapse","data-target":"#collapseProducts","aria-expanded":"false","aria-controls":"collapseProducts"},n.a.createElement("div",{className:"sb-nav-link-icon"},n.a.createElement("i",{className:"fas fa-box"})),"Products",n.a.createElement("div",{className:"sb-sidenav-collapse-arrow"},n.a.createElement("i",{className:"fas fa-angle-down"}))),n.a.createElement("div",{className:"collapse",id:"collapseProducts","aria-labelledby":"headingTwo","data-parent":"#sidenavAccordion"},n.a.createElement("nav",{className:"sb-sidenav-menu-nested nav"},n.a.createElement("a",{className:"nav-link sub_nav_link",onClick:t},"All Products"),n.a.createElement("a",{className:"nav-link sub_nav_link",onClick:o},"Add Product"),n.a.createElement("a",{className:"nav-link sub_nav_link",onClick:s},"Edit Product"))),n.a.createElement("a",{className:"nav-link collapsed",href:"#","data-toggle":"collapse","data-target":"#collapseCustomer","aria-expanded":"false","aria-controls":"collapseProducts"},n.a.createElement("div",{className:"sb-nav-link-icon"},n.a.createElement("i",{className:"fas fa-box"})),"Customer",n.a.createElement("div",{className:"sb-sidenav-collapse-arrow"},n.a.createElement("i",{className:"fas fa-angle-down"}))),n.a.createElement("div",{className:"collapse",id:"collapseCustomer","aria-labelledby":"headingTwo","data-parent":"#sidenavAccordion"},n.a.createElement("nav",{className:"sb-sidenav-menu-nested nav"},n.a.createElement("a",{className:"nav-link sub_nav_link",onClick:c},"All Customer"),n.a.createElement("a",{className:"nav-link sub_nav_link",onClick:m},"Edit Customer"))),n.a.createElement("a",{className:"nav-link collapsed",href:"#","data-toggle":"collapse","data-target":"#collapseVendor","aria-expanded":"false","aria-controls":"collapseProducts"},n.a.createElement("div",{className:"sb-nav-link-icon"},n.a.createElement("i",{className:"fas fa-box"})),"Vendor",n.a.createElement("div",{className:"sb-sidenav-collapse-arrow"},n.a.createElement("i",{className:"fas fa-angle-down"}))),n.a.createElement("div",{className:"collapse",id:"collapseVendor","aria-labelledby":"headingTwo","data-parent":"#sidenavAccordion"},n.a.createElement("nav",{className:"sb-sidenav-menu-nested nav"},n.a.createElement("a",{className:"nav-link sub_nav_link",onClick:r},"All Vendor"),n.a.createElement("a",{className:"nav-link sub_nav_link",onClick:i},"Edit Vendor")))))))}function f(){var e=Object(l.useContext)(D).state;if(!1===e.isAuthenticated)return alert("Login First"),n.a.createElement(E.b,{to:"/login"});var a=Object(l.useState)([]),t=Object(o.a)(a,2),c=t[0],r=t[1],s=Object(l.useState)(null),m=Object(o.a)(s,2),i=m[0],u=m[1];return Object(l.useEffect)((function(){h.a.get("/admin/products",{headers:{Authorization:localStorage.getItem("token")}}).then((function(e){JSON.stringify(e.data),r(e.data)})).catch((function(e){console.log(e)}))}),[]),n.a.createElement("div",{id:"layoutSidenav_content"},n.a.createElement("main",null,n.a.createElement("div",{className:"col-xl-12 col-md-12"},n.a.createElement("div",{className:"card card-static-2 mb-30"},n.a.createElement("div",{className:"card-title-2"},n.a.createElement("h4",null,"Recent Orders"),n.a.createElement("a",{href:"#myModal",className:"view-btn hover-btn","data-toggle":"modal"},n.a.createElement("i",{className:"fas fa-trash-alt "})),n.a.createElement("div",{id:"myModal",className:"modal fade"},n.a.createElement("div",{className:"modal-dialog modal-confirm"},n.a.createElement("div",{className:"modal-content"},n.a.createElement("div",{className:"modal-header flex-column"},n.a.createElement("div",{className:"icon-box"},n.a.createElement("i",{className:"fas fa-times"})),n.a.createElement("h4",{className:"modal-title w-100"},"Are you sure?"),n.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-hidden":"true"},"\xd7")),n.a.createElement("form",null,n.a.createElement("div",{className:"form-group row"},n.a.createElement("label",{className:"col-sm-4 col-form-label"},"Product ID"),n.a.createElement("div",{className:"col-sm-8"},n.a.createElement("input",{type:"number",className:"form-control",onChange:function(e){return u(e.target.value)},placeholder:"Product ID"}))),n.a.createElement("button",{type:"button",className:"btn btn-danger","data-dismiss":"modal",onClick:function(){h.a.delete("/admin/products",{headers:{Authorization:e.token},data:{Product_ID:i}}).then((function(e){alert("Product "+i+" Disabled")})).catch((function(e){alert("Error occured while deleting")}))}},"Delete")))))),n.a.createElement("div",{className:"card-body-table"},n.a.createElement("div",{className:"table-responsive"},n.a.createElement("table",{className:"table ucp-table table-hover"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",{style:{width:130}},"Product ID"),n.a.createElement("th",{style:{width:130}},"Product Name"),n.a.createElement("th",{style:{width:200}},"Product Qty."),n.a.createElement("th",{style:{width:200}},"Product Price"),n.a.createElement("th",{style:{width:130}},"Product Image"),n.a.createElement("th",{style:{width:130}},"Discount"),n.a.createElement("th",{style:{width:100}},"Vendor ID"))),n.a.createElement("tbody",null,c.map((function(e){return n.a.createElement("tr",{key:e.Product_ID},n.a.createElement("td",null,e.Product_ID),n.a.createElement("td",null,e.product_name," "),n.a.createElement("td",null,e.max_product_qty),n.a.createElement("td",null,"\u20b9",e.product_price),n.a.createElement("td",null,n.a.createElement("a",{href:"#",className:"avatar avatar-sm"},n.a.createElement("img",{alt:"Image not available",height:"30px",src:e.product_image}))),n.a.createElement("td",null,e.discount," %"),n.a.createElement("td",null,e.Vendor_ID))}))))))))))}function g(){if(!1===Object(l.useContext)(D).state.isAuthenticated)return alert("Login First"),n.a.createElement(Redirect,{to:"/login"});var e=Object(l.useState)([]),a=Object(o.a)(e,2),t=a[0],c=a[1];return Object(l.useEffect)((function(){h.a.get("/admin/customers",{headers:{Authorization:localStorage.getItem("token")}}).then((function(e){JSON.stringify(e.data),c(e.data)})).catch((function(e){console.log(e)}))}),[]),n.a.createElement("div",{id:"layoutSidenav_content"},n.a.createElement("main",null,n.a.createElement("div",{className:"col-xl-12 col-md-12"},n.a.createElement("div",{className:"card card-static-2 mb-30"},n.a.createElement("div",{className:"card-title-2"},n.a.createElement("h4",null,"All Customers"),n.a.createElement("a",{className:"view-btn hover-btn"},"Edit")),n.a.createElement("div",{className:"card-body-table"},n.a.createElement("div",{className:"table-responsive"},n.a.createElement("table",{className:"table ucp-table table-hover"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",{style:{width:130}},"Customer ID"),n.a.createElement("th",{style:{width:130}},"Name"),n.a.createElement("th",{style:{width:130}},"Mobile No."),n.a.createElement("th",{style:{width:130}},"Alt Mobile No."),n.a.createElement("th",{style:{width:200}},"Address"),n.a.createElement("th",{style:{width:130}},"City"),n.a.createElement("th",{style:{width:130}},"Last Login"))),n.a.createElement("tbody",null,t.map((function(e){return n.a.createElement("tr",null,n.a.createElement("td",null,e.User_ID),n.a.createElement("td",null,e.Name," "),n.a.createElement("td",null,e.MobNo1),n.a.createElement("td",null,e.MobNo2),n.a.createElement("td",null,e.Address),n.a.createElement("td",null,e.City),n.a.createElement("td",null,e.LastLogin))}))))))))))}function O(){var e=Object(E.h)(),a=Object(l.useCallback)((function(){return e.push("/Vendor/edit")}),[e]),t=Object(l.useState)([]),c=Object(o.a)(t,2),r=c[0],s=c[1];return Object(l.useEffect)((function(){h.a.get("/admin/vendors",{headers:{Authorization:localStorage.getItem("token")}}).then((function(e){JSON.stringify(e.data),s(e.data)})).catch((function(e){console.log(e)}))}),[]),n.a.createElement("div",{id:"layoutSidenav_content"},n.a.createElement("main",null,n.a.createElement("div",{className:"col-xl-12 col-md-12"},n.a.createElement("div",{className:"card card-static-2 mb-30"},n.a.createElement("div",{className:"card-title-2"},n.a.createElement("h4",null,"All Vendor"),n.a.createElement("a",{onClick:a,className:"view-btn hover-btn"},"View All")),n.a.createElement("div",{className:"card-body-table"},n.a.createElement("div",{className:"table-responsive"},n.a.createElement("table",{className:"table ucp-table table-hover"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",{style:{width:120}},"Vendor ID"),n.a.createElement("th",{style:{width:80}},"Name"),n.a.createElement("th",{style:{width:100}},"Mobile No."),n.a.createElement("th",{style:{width:150}},"Shop Owner name"),n.a.createElement("th",{style:{width:150}},"Shop GST No."),n.a.createElement("th",{style:{width:150}},"Shop Phone No."),n.a.createElement("th",{style:{width:130}},"Shop Name"),n.a.createElement("th",{style:{width:130}},"Location"),n.a.createElement("th",{style:{width:100}},"Action"))),n.a.createElement("tbody",null,r.map((function(e){return n.a.createElement("tr",null,n.a.createElement("td",null,e.User_ID),n.a.createElement("td",null,e.Name," "),n.a.createElement("td",null,e.MobNo1),n.a.createElement("td",null,e.Shop_Owner_name),n.a.createElement("td",null,e.ShopGstno),n.a.createElement("td",null,e.ShopPhoneno),n.a.createElement("td",null,e.Shop_name),n.a.createElement("td",null,e.latitudes,", ",e.longitude),n.a.createElement("td",{className:"action-btns"},n.a.createElement("a",{onClick:function(){console.log("He")}},n.a.createElement("i",{className:"fas fa-edit"}))))}))))))))))}function y(){if(!1===Object(l.useContext)(D).state.isAuthenticated)return alert("Login First"),n.a.createElement(E.b,{to:"/login"});var e=Object(l.useState)([]),a=Object(o.a)(e,2),t=a[0],c=a[1],r=Object(l.useState)([]),s=Object(o.a)(r,2),m=s[0],i=s[1],u=Object(l.useState)([]),d=Object(o.a)(u,2),b=d[0],p=d[1],v=Object(l.useState)([]),N=Object(o.a)(v,2),f=N[0],g=N[1],O=Object(l.useState)([]),y=Object(o.a)(O,2),j=y[0],S=y[1],C=Object(l.useState)([]),w=Object(o.a)(C,2),k=w[0],x=w[1],_=Object(l.useState)([]),I=Object(o.a)(_,2),P=I[0],A=I[1],L=Object(l.useState)([]),M=Object(o.a)(L,2),V=M[0],U=M[1];return n.a.createElement("div",{id:"layoutSidenav_content"},n.a.createElement("main",null,n.a.createElement("div",{className:"col-xl-12 col-md-12"},n.a.createElement("div",{className:"card card-static-2 mb-30"},n.a.createElement("div",{className:" card-title-2"},n.a.createElement("h4",null,"Add Product")),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"Row"},n.a.createElement("form",{className:"p-5",onSubmit:function(e){e.preventDefault()}},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Name"),n.a.createElement("input",{type:"text",onChange:function(e){return c(e.target.value)},className:"form-control",placeholder:"Enter product name"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Quantity"),n.a.createElement("input",{type:"Number",onChange:function(e){return i(e.target.value)},className:"form-control",placeholder:"Enter product quantity"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Price"),n.a.createElement("input",{type:"text",onChange:function(e){return p(e.target.value)},className:"form-control",placeholder:"Enter Product price"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Image"),n.a.createElement("input",{type:"text",onChange:function(e){return g(e.target.value)},className:"form-control",placeholder:"Enter image URL"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Discount"),n.a.createElement("input",{type:"number",onChange:function(e){return S(e.target.value)},className:"form-control",placeholder:"Enter email"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Vendor ID"),n.a.createElement("input",{type:"Number",onChange:function(e){return x(e.target.value)},className:"form-control",placeholder:"Password"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Expiry Date"),n.a.createElement("input",{type:"date",onChange:function(e){return A(e.target.value)},className:"form-control",placeholder:"Password"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Category"),n.a.createElement("input",{type:"text",onChange:function(e){return U(e.target.value)},className:"form-control",placeholder:"Category"})),n.a.createElement("button",{type:"submit",onClick:function(){h.a.post("/admin/products",{Vendor_ID:k,max_product_qty:m,product_name:t,product_price:b,product_image:f,discount:j,category:V,expiry_date:P},{headers:{Authorization:localStorage.getItem("token")}}).then((function(e){console.log(e),alert(e)})).catch((function(e){alert(e),console.log(res)}))},className:"btn btn-primary"},"Submit"))))))))}function j(){if(!1===Object(l.useContext)(D).state.isAuthenticated)return alert("Login First"),n.a.createElement(E.b,{to:"/login"});var e=Object(l.useState)([]),a=Object(o.a)(e,2),t=a[0],c=a[1],r=Object(l.useState)([]),s=Object(o.a)(r,2),m=s[0],i=s[1],u=Object(l.useState)([]),d=Object(o.a)(u,2),b=d[0],p=d[1],v=Object(l.useState)([]),N=Object(o.a)(v,2),f=N[0],g=N[1],O=Object(l.useState)([]),y=Object(o.a)(O,2),j=y[0],S=y[1],C=Object(l.useState)([]),w=Object(o.a)(C,2),k=w[0],x=w[1],_=Object(l.useState)([]),I=Object(o.a)(_,2),P=I[0],A=I[1],L=Object(l.useState)([]),M=Object(o.a)(L,2),V=M[0],U=M[1],R=Object(l.useState)([]),T=Object(o.a)(R,2),G=T[0],z=T[1];return n.a.createElement("div",{id:"layoutSidenav_content"},n.a.createElement("main",null,n.a.createElement("div",{className:"col-xl-12 col-md-12"},n.a.createElement("div",{className:"card card-static-2 mb-30"},n.a.createElement("div",{className:"card-title-2"},n.a.createElement("h4",null,"Edit Product")),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"Row"},n.a.createElement("form",{className:"p-5"},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Product ID you want to edit"),n.a.createElement("input",{type:"text",onChange:function(e){return U(e.target.value)},className:"form-control",placeholder:"Enter product name"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Name"),n.a.createElement("input",{type:"email",onChange:function(e){return c(e.target.value)},className:"form-control",placeholder:"Enter product name"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Quantity"),n.a.createElement("input",{type:"Number",onChange:function(e){return i(e.target.value)},className:"form-control",placeholder:"Enter product quantity"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Price"),n.a.createElement("input",{type:"text",onChange:function(e){return p(e.target.value)},className:"form-control",placeholder:"Enter Product price"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Image"),n.a.createElement("input",{type:"text",onChange:function(e){return g(e.target.value)},className:"form-control",placeholder:"Enter image URL"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Discount"),n.a.createElement("input",{type:"number",onChange:function(e){return S(e.target.value)},className:"form-control",placeholder:"Enter email"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Vendor ID"),n.a.createElement("input",{type:"Number",onChange:function(e){return x(e.target.value)},className:"form-control",placeholder:"Password"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Expiry Date"),n.a.createElement("input",{type:"date",onChange:function(e){return A(e.target.value)},className:"form-control",placeholder:"Password"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Category"),n.a.createElement("input",{type:"text",onChange:function(e){return z(e.target.value)},className:"form-control",placeholder:"Category"})),n.a.createElement("button",{onClick:function(){h.a.patch("/admin/products",{Vendor_ID:k,max_product_qty:m,product_name:t,product_price:b,product_image:f,discount:j,category:G,expiry_date:P,Product_ID:V},{headers:{Authorization:localStorage.getItem("token")}}).then((function(e){alert(JSON.stringify(e.data))})).catch((function(e){alert(e)}))},className:"btn btn-primary"},"Submit"))))))))}function S(){if(!1===Object(l.useContext)(D).state.isAuthenticated)return alert("Login First"),n.a.createElement(Redirect,{to:"/login"});var e=Object(l.useState)([]),a=Object(o.a)(e,2),t=a[0],c=a[1],r=Object(l.useState)([]),s=Object(o.a)(r,2),m=s[0],i=s[1],u=Object(l.useState)([]),d=Object(o.a)(u,2),E=d[0],b=d[1],p=Object(l.useState)([]),v=Object(o.a)(p,2),N=v[0],f=v[1],g=Object(l.useState)([]),O=Object(o.a)(g,2),y=O[0],j=O[1],S=Object(l.useState)([]),C=Object(o.a)(S,2),w=C[0],k=C[1];return n.a.createElement("div",{id:"layoutSidenav_content"},n.a.createElement("main",null,n.a.createElement("div",{className:"col-xl-12 col-md-12"},n.a.createElement("div",{className:"card card-static-2 mb-30"},n.a.createElement("div",{className:"card-title-2"},n.a.createElement("h4",null,"Edit Customer")),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"Row"},n.a.createElement("form",{className:"p-5",onSubmit:function(e){return e.preventDefault()}},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Name"),n.a.createElement("input",{type:"text",onChange:function(e){return c(e.target.value)},className:"form-control",placeholder:"Enter Customer name"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Mobile Number"),n.a.createElement("input",{type:"Text",onChange:function(e){return i(e.target.value)},className:"form-control",placeholder:"Enter Mobile Number"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Alt. Mobile Number"),n.a.createElement("input",{type:"text",onChange:function(e){return b(e.target.value)},className:"form-control",placeholder:"Enter Second Mobile Number"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Address"),n.a.createElement("input",{type:"text",onChange:function(e){return f(e.target.value)},className:"form-control",placeholder:"Enter Address"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"City"),n.a.createElement("input",{type:"text",onChange:function(e){return j(e.target.value)},className:"form-control",placeholder:"Enter City"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"User ID you want to edit"),n.a.createElement("input",{type:"Number",onChange:function(e){return k(e.target.value)},className:"form-control",placeholder:"Enter Unique User ID"})),n.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:function(){h.a.patch("/admin/customer",{Name:t,MobNo1:m,MobNo2:E,Address:N,City:y,User_ID:w},{headers:{Authorization:localStorage.getItem("token")}}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}},"Submit"))))))))}function C(){var e=Object(E.h)(),a=Object(l.useCallback)((function(){return e.push("/vendor/list")}),[e]),t=Object(l.useState)([]),c=Object(o.a)(t,2),r=c[0],s=c[1],m=Object(l.useState)([]),i=Object(o.a)(m,2),u=i[0],d=i[1],b=Object(l.useState)([]),p=Object(o.a)(b,2),v=p[0],N=p[1],f=Object(l.useState)([]),g=Object(o.a)(f,2),O=g[0],y=g[1],j=Object(l.useState)([]),S=Object(o.a)(j,2),C=S[0],w=S[1],k=Object(l.useState)([]),x=Object(o.a)(k,2),_=x[0],D=x[1],I=Object(l.useState)([]),P=Object(o.a)(I,2),A=P[0],L=P[1],M=Object(l.useState)([]),V=Object(o.a)(M,2),U=V[0],R=V[1],T=Object(l.useState)([]),G=Object(o.a)(T,2),z=G[0],F=G[1],q=Object(l.useState)([]),J=Object(o.a)(q,2),Q=J[0],B=J[1],H=Object(l.useState)([]),Y=Object(o.a)(H,2),K=Y[0],W=Y[1],X=Object(l.useState)([]),Z=Object(o.a)(X,2),$=Z[0],ee=Z[1],ae=Object(l.useState)([]),te=Object(o.a)(ae,2),le=te[0],ne=te[1],ce=Object(l.useState)([]),re=Object(o.a)(ce,2),oe=re[0],se=re[1];return n.a.createElement("div",{id:"layoutSidenav_content"},n.a.createElement("main",null,n.a.createElement("div",{className:"col-xl-12 col-md-12"},n.a.createElement("div",{className:"card card-static-2 mb-30"},n.a.createElement("div",{className:"card-title-2"},n.a.createElement("h4",null,"Edit Vendor"),n.a.createElement("a",{onClick:a,className:"view-btn hover-btn"},"Go Back")),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"Row"},n.a.createElement("form",{className:"p-5"},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Name"),n.a.createElement("input",{type:"email",onChange:function(e){return s(e.target.value)},className:"form-control",placeholder:"Enter Vendor name"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Mobile Number"),n.a.createElement("input",{type:"text",onChange:function(e){return d(e.target.value)},className:"form-control",placeholder:"Enter Mobile Number"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Alt. Mobile Number"),n.a.createElement("input",{type:"text",onChange:function(e){return N(e.target.value)},className:"form-control",placeholder:"Enter Second Mobile Number"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Address"),n.a.createElement("input",{type:"text",onChange:function(e){return y(e.target.value)},className:"form-control",placeholder:"Enter Address"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"City"),n.a.createElement("input",{type:"text",onChange:function(e){return D(e.target.value)},className:"form-control",placeholder:"Enter City"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Shop Owner name"),n.a.createElement("input",{type:"text",onChange:function(e){return R(e.target.value)},className:"form-control",placeholder:"Enter shop owner name"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Shop GST Number"),n.a.createElement("input",{type:"text",onChange:function(e){return F(e.target.value)},className:"form-control",placeholder:"Enter Shop GST Number"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Shop Phone Number"),n.a.createElement("input",{type:"text",onChange:function(e){return B(e.target.value)},className:"form-control",placeholder:"Enter Shop Phone Number"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Shop Name"),n.a.createElement("input",{type:"text",onChange:function(e){return W(e.target.value)},className:"form-control",placeholder:"Enter Shop Name"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Latitude"),n.a.createElement("input",{type:"text",onChange:function(e){return ee(e.target.value)},className:"form-control",placeholder:"Enter Latitude"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Longitude"),n.a.createElement("input",{type:"text",onChange:function(e){return ne(e.target.value)},className:"form-control",placeholder:"Enter Longitude"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Deposit"),n.a.createElement("input",{type:"text",onChange:function(e){return L(e.target.value)},className:"form-control",placeholder:"Enter Longitude"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"User ID you want to edit"),n.a.createElement("input",{type:"Number",onChange:function(e){return se(e.target.value)},className:"form-control",placeholder:"Enter Unique User ID"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"VERIFIED"),n.a.createElement("input",{type:"number",onChange:function(e){return w(e.target.value)},className:"form-control",placeholder:"Enter 0 or 1 for true or false"})),n.a.createElement("button",{onClick:function(){h.a.patch("/admin/vendor",{Name:r,MobNo1:u,MobNo2:v,Address:O,VERIFIED:C,City:_,deposit:A,Shop_Owner_name:U,ShopGstno:z,ShopPhoneno:Q,Shop_name:K,latitudes:$,longitude:le,User_ID:oe},{headers:{Authorization:localStorage.getItem("token")}}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))},className:"btn btn-primary"},"Submit"))))))))}function w(){if(!1===Object(l.useContext)(D).state.isAuthenticated)return alert("Login First"),n.a.createElement(E.b,{to:"/login"});var e=Object(l.useState)(""),a=Object(o.a)(e,2),t=a[0],c=a[1],r=Object(l.useState)(""),s=Object(o.a)(r,2),m=s[0],i=s[1],u=Object(l.useState)(""),d=Object(o.a)(u,2),b=d[0],p=d[1],v=Object(l.useState)(""),N=Object(o.a)(v,2),f=N[0],g=N[1];return n.a.createElement("div",{id:"layoutSidenav_content"},n.a.createElement("main",null,n.a.createElement("div",{className:"col-xl-12 col-md-12"},n.a.createElement("div",{className:"card card-static-2 mb-30"},n.a.createElement("div",{className:"card-title-2"},n.a.createElement("h4",null,"Edit Order")),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"Row"},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Order_ID"),n.a.createElement("input",{type:"text",onChange:function(e){return c(e.target.value)},className:"form-control",placeholder:"Enter Order ID"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Product ID"),n.a.createElement("input",{type:"text",onChange:function(e){return g(e.target.value)},className:"form-control",placeholder:"Enter Product ID"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Status"),n.a.createElement("input",{type:"text",onChange:function(e){return i(e.target.value)},className:"form-control",placeholder:"Enter Status"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Delivery Date"),n.a.createElement("input",{type:"date",onChange:function(e){return p(e.target.value)},className:"form-control"})),n.a.createElement("button",{onClick:function(){h.a.patch("/admin/orders",{OrderId:t,status:m,delivery_date:b,Product_ID:f},{headers:{Authorization:localStorage.getItem("token")}}).then((function(e){alert(e.data),console.log(e)})).catch((function(e){alert(e),console.log(e)}))},className:"btn btn-primary"},"Submit")))))))}var k=t(13),x=t(61);t(64);var _=function(e){if(Object(l.useContext)(D).state.isAuthenticated)return n.a.createElement("h1",null,"Already");var a=Object(l.useContext)(D).dispatch,t=Object(l.useState)({isSubmitting:!1,errorMessage:null}),c=Object(o.a)(t,2),r=c[0],m=c[1],i=Object(l.useState)({mobile:"",password:""}),u=Object(o.a)(i,2),d=u[0],E=u[1],b=function(e){E(Object(s.a)(Object(s.a)({},d),{},Object(k.a)({},e.target.name,e.target.value))),console.log(d)};return n.a.createElement("div",{id:"layoutSidenav_content"},n.a.createElement("div",{className:"container"},n.a.createElement("br",null),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col"},n.a.createElement("h1",null,"Login Form"),n.a.createElement("hr",null),n.a.createElement("form",{onSubmit:function(e){e.preventDefault(),m(Object(s.a)(Object(s.a)({},r),{},{isSubmitting:!0,errorMessage:null}));var t={MobNo1:d.mobile,password:d.password};h.a.post("/auth/admin",x.stringify(t),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){throw console.log(e),!0===e.data.success&&1===e.data.isVerified?a({type:"LOGIN",payload:e.data}):(!0===e.data.success&&e.data.isVerified,m(Object(s.a)(Object(s.a)({},r),{},{isSubmitting:!1,errorMessage:e.data.message}))),e})).catch((function(e){console.log(e)}))}},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Mobile Number"),n.a.createElement("input",{className:"form-control",type:"text",onChange:b,name:"mobile",placeholder:"Enter Mobile Number",value:d.mobile})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Password"),n.a.createElement("input",{className:"form-control",type:"password",onChange:b,name:"password",id:"examplePassword",placeholder:"Enter Your Password",value:d.password})),n.a.createElement("div",{className:"form-group"},r.errorMessage&&n.a.createElement("div",{className:"alert alert-danger",role:"alert"},r.errorMessage)),n.a.createElement("div",{className:"form-group"},n.a.createElement("button",{className:"btn btn-primary",disabled:r.isSubmitting},r.isSubmitting?"..Loading":"Login")))))))};l.Component;var D=Object(l.createContext)(),I={isAuthenticated:null,user:null,token:null,tokenExpires:0,role:0},P=function(e,a){switch(a.type){case"LOGIN":return localStorage.setItem("user",JSON.stringify(a.payload.user)),localStorage.setItem("token",a.payload.token),Object(s.a)(Object(s.a)({},e),{},{isAuthenticated:!0,user:a.payload.user,token:a.payload.token});case"LOGOUT":return localStorage.clear(),Object(s.a)(Object(s.a)({},e),{},{isAuthenticated:!1,user:null});default:return e}};function A(){var e=Object(l.useReducer)(P,I),a=Object(o.a)(e,2),t=a[0],c=a[1];return t.isAuthenticated||0==localStorage.length||c({type:"LOGIN",payload:{user:localStorage.getItem("user"),token:localStorage.getItem("token")}}),n.a.createElement("div",{className:"App"},n.a.createElement(E.a,null,n.a.createElement(E.e,null,n.a.createElement(D.Provider,{value:{state:t,dispatch:c}},n.a.createElement(b,null),n.a.createElement("div",{id:"layoutSidenav"},n.a.createElement(N,null),n.a.createElement(E.c,{exact:!0,path:"/",component:v}),n.a.createElement(E.c,{path:"/customer/list",component:g}),n.a.createElement(E.c,{path:"/vendor/list",component:O}),n.a.createElement(E.c,{path:"/product/list",component:f}),n.a.createElement(E.c,{path:"/product/create",component:y}),n.a.createElement(E.c,{path:"/product/edit",component:j}),n.a.createElement(E.c,{path:"/customer/edit",component:S}),n.a.createElement(E.c,{path:"/Vendor/edit",component:C}),n.a.createElement(E.c,{path:"/order/edit",component:w}),n.a.createElement(E.c,{path:"/login",component:_}))))))}var L=t(11);r.a.render(n.a.createElement(L.a,{basename:""},n.a.createElement(A,null)),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.908f849c.chunk.js.map