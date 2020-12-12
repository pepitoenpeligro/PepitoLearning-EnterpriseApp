package com.pepe.api;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.TimeZone;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import com.pepe.dao.LogDao;
import com.pepe.dao.ProductDao;
import com.pepe.models.Log;
import com.pepe.models.Product;
import com.sun.jersey.api.client.ClientResponse.Status;

@Path(value = "/products")
public class RestServiceProducts {
	
	@GET
	@Produces("application/json")
	@Path(value = "/")
	public Response getProducts() {
		List<Product> msg = new ProductDao().obtenerProductos();

		return Response.status(Status.OK).entity(msg)
				.header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With")
				.build();
	}
	
	@POST
	@Consumes("application/json")
	@Produces(MediaType.APPLICATION_JSON)
	public Response addProduct(Product p) {
		ObjectMapper mapper = new ObjectMapper();
		String json = "";
		
		ProductDao pao = new ProductDao();
		pao.guardar(p);
		
		Log l = new Log();
		LogDao ldao = new LogDao();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT+1"));
		String timestamp = sdf.format(Calendar.getInstance().getTime());
		String description = "#" + timestamp + "#" + "Added product: " + p.getName();
		l.setDescription(description);
		l.setType(new String("product"));
		ldao.guardar(l);
		
		
		return Response.status(Status.CREATED).build();
	}
	
	
	@DELETE
	@Path("/{id}")
	@Consumes("application/json")
	public Response removeProduct(@PathParam ("id") String id) {
		ObjectMapper mapper = new ObjectMapper();
		String json = "";
		ProductDao pao = new ProductDao();
		Product pp = pao.buscar(Long.parseLong(id));
		pao.eliminar(Long.parseLong(id));
		
		Log l = new Log();
		LogDao ldao = new LogDao();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT+1"));
		String timestamp = sdf.format(Calendar.getInstance().getTime());
		String description = "#" + timestamp + "#" + "Removed product: " + pp.getName();
		l.setDescription(description);
		l.setType(new String("product"));
		ldao.guardar(l);
		
		return Response.status(Status.CREATED).build();
	}

}
