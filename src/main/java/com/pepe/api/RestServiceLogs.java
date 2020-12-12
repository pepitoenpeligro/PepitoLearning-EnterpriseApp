package com.pepe.api;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.pepe.dao.LogDao;
import com.pepe.dao.ProductDao;
import com.pepe.models.Log;
import com.pepe.models.Product;
import com.sun.jersey.api.client.ClientResponse.Status;

@Path(value = "/logs")
public class RestServiceLogs {
	@GET
	@Produces("application/json")
	@Path(value = "/users")
	public Response getLogsUser() {
		List<Log> msg = new LogDao().obtenerLogs("user");

		String json = "";
		ObjectMapper mapper = new ObjectMapper();
		try {
			json = mapper.writeValueAsString(msg);
			return Response.status(Status.OK).entity(msg).build();
		} catch (IOException e) {
			e.printStackTrace();
			return Response.status(Status.NOT_FOUND).entity(msg).build();
		}

	}
	
	
	
	
	
	@GET
	@Produces("application/json")
	@Path(value = "/products")
	public Response getLogsProducts() {
		List<Log> msg = new LogDao().obtenerLogs("product");

		String json = "";
		ObjectMapper mapper = new ObjectMapper();
		try {
			json = mapper.writeValueAsString(msg);
			return Response.status(Status.OK).entity(msg).build();
		} catch (IOException e) {
			e.printStackTrace();
			return Response.status(Status.NOT_FOUND).entity(msg).build();
		}
	}
	
	
	
	
	
	
	@GET
	@Produces("application/json")
	@Path(value = "/cart")
	public Response getLogsCart() {
		List<Log> msg = new LogDao().obtenerLogs("cart");

		String json = "";
		ObjectMapper mapper = new ObjectMapper();
		try {
			json = mapper.writeValueAsString(msg);
			return Response.status(Status.OK).entity(msg).build();
		} catch (IOException e) {
			e.printStackTrace();
			return Response.status(Status.NOT_FOUND).entity(msg).build();
		}
	}
}
