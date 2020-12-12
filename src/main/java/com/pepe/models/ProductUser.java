package com.pepe.models;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ProductUser {
	Long idProducto;
	String email;
	
	public Long getIdProducto() {
		return idProducto;
	}
	
	public void setIdProducto(Long idProducto) {
		this.idProducto = idProducto;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
