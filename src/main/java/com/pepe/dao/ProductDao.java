package com.pepe.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.pepe.models.JPAUtil;
import com.pepe.models.Product;
import com.pepe.models.User;

public class ProductDao {

	EntityManager entity = JPAUtil.getEntityManagerFactory().createEntityManager();

	public void guardar(Product p) {
		entity.getTransaction().begin();
		entity.persist(p);
		entity.getTransaction().commit();
		entity.clear();
	}
	
	public void editar(Product p) {
		entity.getTransaction().begin();
		entity.merge(p);
		entity.getTransaction().commit();
	}

	public Product buscar(Long id) {
		Product u = new Product();
		u = entity.find(Product.class, id);
		return u;
	}

	public void eliminar(Long id) {
		Product p = new Product();
		p = entity.find(Product.class, id);
		entity.getTransaction().begin();
		entity.remove(p);
		entity.getTransaction().commit();
	}

	public List<Product> obtenerProductos() {
		List<Product> listaProductos = new ArrayList<>();
		Query q = entity.createQuery("SELECT c FROM Product c");
		listaProductos = q.getResultList();
		return listaProductos;
	}
}
