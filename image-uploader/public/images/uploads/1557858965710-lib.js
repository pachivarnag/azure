
$=jQuery;
$('.pageclick').click(function () {
	var pageurl = $('#pageid').val().split(",");;		
	// var getid = pageurl.split( '/' );
	// var productid = getid.pop();
	
	for (i=0;i<pageurl.length;i++){
		
		pageid ="https://wm6.walmart.com/trmsupport/services/trmProductinformation.asmx/GetProductInfoDB?productIDs="+pageurl[i];
		console.log(pageurl[i]);
		
		$.getJSON(pageid).done(function (data) {			
			Object.keys(data).forEach(function (key) {			  
				if(key == 'data'){  
					var newKey = data[key];	
								
					Object.keys(newKey).forEach(function (subkey) {						
						var itemkey = newKey[subkey];
						var lgthinfo ={}
						var tableinfo ={}
						
						$(function (tagkey) {	
															
							var itemid  = itemkey.ItemId ;
							var stock  = itemkey.Stock ;
							var producturl  = itemkey.ProductUrl ; 
							var name  = itemkey.Name ;
							var namelgth = name.length; 
							var availableonline  = itemkey.AvailableOnline ;								
							var shortdesctxt = itemkey.ShortDescription;
							var shortdesclgth = shortdesctxt.replace(/([,.€])+/g, '').split(' ').length;																						
							var longdesctxt = itemkey.LongDescription;								
							var longdesclgth = longdesctxt.replace(/([,.€])+/g, '').split(' ').length;									
							var producttotaldesc = longdesclgth + shortdesclgth;
							var numreviewslgth = itemkey.NumReviews;								
							var categorypath = itemkey.CategoryPath;								
							var customerratingsleth = itemkey.CustomerRatings;							
							var imageentities = itemkey.ImageEntities;								
							var imageentitieslgth = imageentities.length;

							lgthinfo.namelgth = namelgth;
							lgthinfo.shortdesclgth = shortdesclgth;
							lgthinfo.longdesclgth = longdesclgth;
							lgthinfo.imageentitieslgth = imageentitieslgth;
							lgthinfo.numreviewslgth = numreviewslgth;
							lgthinfo.customerratingsleth = customerratingsleth;
							lgthinfo.producttotaldesc = producttotaldesc;

							tableinfo.itemid = itemid;
							tableinfo.name = name;
							tableinfo.namelgth = namelgth;
							tableinfo.producttotaldesc = producttotaldesc;
							tableinfo.stock = stock;
							tableinfo.availableonline = availableonline;
							tableinfo.producturl = producturl;						
							tableinfo.shortdesclgth = shortdesclgth;
							tableinfo.longdesclgth = longdesclgth;
							tableinfo.producttotaldesc = producttotaldesc;						
							tableinfo.numreviewslgth = numreviewslgth;
							tableinfo.customerratingsleth = customerratingsleth;
							tableinfo.imageentitieslgth = imageentitieslgth;					
							
							var row = $('<tr></tr>');
							$.each(tableinfo, function( endkey,endvalue ) {
								var row1 = $('<td></td>').addClass(endkey).text(endvalue);
								row.append(row1);				
							console.log(row);
															
							});	
							$('#health-report table').append(row);
							
                                    
							var checkcondition ={
								"namelgth":{a:"0",b:"25",c:"35",d:"50",e:"65"},
								"shortdesclgth":{a:"0",b:"51",c:"70",d:"99",e:"100"},
								"longdesclgth":{a:"0",b:"51",c:"70",d:"99",e:"100"},
								"imageentitieslgth":{a:"0",b:"1",c:"3",d:"6",e:"7"},
								"numreviewslgth":{a:"0",b:"25",c:"35",d:"50",e:"65"},
								"customerratingsleth":{a:"0",b:"25",c:"35",d:"50",e:"65"}, 
								"producttotaldesc":{a:"0",b:"101",c:"150",d:"199",e:"200"},
							}

							Object.keys(lgthinfo).forEach(function (i) {
								var lgthval = lgthinfo[i];
								Object.keys(checkcondition).forEach(function (val) {
								//$.each(checkcondition,function (val) {
									if(i == val ) {								
										var lgthcondition = checkcondition[val];									
										switch(true){	
											case ((lgthval == checkcondition[val].a)):									
											$('td.'+val).css('background','#ff0000');																								   																									
											break;									
											case ((lgthval <= checkcondition[val].b)):									
											$('td.'+val).css('background','#ff0000');																										   																									
											break;
											case ((lgthval <= checkcondition[val].c)):									
											$('td.'+val).css('background','#db7093');																				
											break;									
											case ((lgthval <= checkcondition[val].d)):								
											$('td.'+val).css('background','#00ff7f');																			
											break;
											case ((lgthval >= checkcondition[val].e)):									
											$('td.'+val).css('background','#008000');																																					
											break;																
										} 
									}
									
								}); 									
							});

							

						});
						
						
					});				
				}			
			});		
		});
		
		console.log(row);
		
	}
	//$('#pageid').val('');
}); 

$("#btnExport").click(function(e) {
    window.open('data:application/vnd.ms-excel,' + $('#health-report').html());
    e.preventDefault();
});



	


	
