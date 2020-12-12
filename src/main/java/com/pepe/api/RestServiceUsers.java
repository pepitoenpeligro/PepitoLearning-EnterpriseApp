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
import javax.ws.rs.Produces;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.pepe.dao.LogDao;
import com.pepe.dao.UserDao;
import com.pepe.models.Log;
import com.pepe.models.User;
import com.sun.jersey.api.client.ClientResponse.Status;

@Path(value = "/users")
public class RestServiceUsers {
	
	@GET
	@Produces("application/json")
	@Path(value = "/")
	public Response getUsers() {
		List<User> msg = new UserDao().obtenerUsuarios();
		return Response.status(Status.OK).entity(msg)
				.header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With")
				.build();
	}
	
	
	@POST
	@Path("/")
	@Consumes("application/json")
	public Response addUser(User u) {
		UserDao sdao = new UserDao();
		sdao.guardar(u);
		
		Log l = new Log();
		LogDao ldao = new LogDao();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT+1"));
		String timestamp = sdf.format(Calendar.getInstance().getTime());
		String description = "#" + timestamp + "#" + "User registered" + u.getEmail();
		l.setDescription(description);
		l.setType(new String("user"));
		ldao.guardar(l);
		
        return Response.ok().status(Status.CREATED).entity(u)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }
	
	
	@POST
	@Path("/login")
	@Consumes("application/json")
	@Produces(MediaType.APPLICATION_JSON)
	public Response doLogin(User u) {
		User u1 = new UserDao().buscar(u.getEmail());
		ObjectMapper mapper = new ObjectMapper();
		String json = "";
		if(u1.getPassword().contains(u.getPassword())) {
			System.out.println("Login coincide email y password");
			try {
				json = mapper.writeValueAsString(u1);
				System.out.println("Login" + json);
				
				Log l = new Log();
				LogDao ldao = new LogDao();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
				sdf.setTimeZone(TimeZone.getTimeZone("GMT+1"));
				String timestamp = sdf.format(Calendar.getInstance().getTime());
				String description = "#" + timestamp + "#" + "User login: " + u.getEmail();
				l.setDescription(description);
				l.setType(new String("user"));
				ldao.guardar(l);
				
				
				return Response.ok().status(Status.ACCEPTED).entity(json).header("Access-Control-Allow-Origin", "*")
		                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
		                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		return Response.status(Status.NOT_FOUND).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
	}

}
