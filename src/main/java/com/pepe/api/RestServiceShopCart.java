package com.pepe.api;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.TimeZone;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.pepe.dao.LogDao;
import com.pepe.dao.ProductDao;
import com.pepe.dao.ShoppingCartDao;
import com.pepe.dao.UserDao;
import com.pepe.models.Log;
import com.pepe.models.Product;
import com.pepe.models.ProductUser;
import com.pepe.models.User;
import com.sun.jersey.api.client.ClientResponse.Status;

@Path(value = "/shopcart")
public class RestServiceShopCart {

	@POST
	@Path("/item")
	@Consumes("application/json")
	@Produces(MediaType.APPLICATION_JSON)
	public Response addItem(ProductUser pu) {

		System.out.println("We had received from client" + pu.getEmail() + " " + pu.getIdProducto());
		User u1 = new UserDao().buscar(pu.getEmail());

		ShoppingCartDao scd = new ShoppingCartDao();
		scd.addProductToUserCart(pu.getIdProducto(), pu.getEmail());

		System.out.println("{IMPLICIT}[addItem][getItems]" + scd.getProducts(pu.getEmail()));

		JSONObject toSend = new JSONObject();
		/*ObjectMapper mapper = new ObjectMapper();
		String json = "";
		try {
			json = mapper.writeValueAsString(scd.getProducts(pu.getEmail()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/

		return Response.ok().entity(toSend).header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "POST")
				.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
	}

	@POST
	@Path("/items")
	@Consumes("application/json")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getItems(User u) {
		
		ShoppingCartDao scd = new ShoppingCartDao();
		scd.getProducts(u.getEmail());
		
		ObjectMapper mapper = new ObjectMapper();
		String json = "";
		try {
			
			Log l = new Log();
			LogDao ldao = new LogDao();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
			sdf.setTimeZone(TimeZone.getTimeZone("GMT+1"));
			String timestamp = sdf.format(Calendar.getInstance().getTime());

			String description = "#" + timestamp + "#" + "Added product to cart for user: " + u.getEmail();
			l.setDescription(description);
			l.setType(new String("cart"));
			ldao.guardar(l);
	
			
			json = mapper.writeValueAsString(scd.getProducts(u.getEmail()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return Response.status(Status.NOT_FOUND).entity(json).header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Methods", "POST")
					.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
		}
		
		System.out.println("Le envio");
		System.out.println(json);
		return Response.ok().status(Status.ACCEPTED).entity(json).header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "POST")
				.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

	}
}
