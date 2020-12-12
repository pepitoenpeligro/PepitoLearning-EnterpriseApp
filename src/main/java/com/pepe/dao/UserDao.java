package com.pepe.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.pepe.models.JPAUtil;
import com.pepe.models.User;

public class UserDao {

	EntityManager entity = JPAUtil.getEntityManagerFactory().createEntityManager();

	public void guardar(User u) {
		entity.getTransaction().begin();
		entity.persist(u);
		entity.getTransaction().commit();
		entity.clear();
	}

	
	public void editar(User u) {
		entity.getTransaction().begin();
		entity.merge(u);
		entity.getTransaction().commit();
		entity.flush();
	}

	
	public User buscar(Long id) {
		entity.getTransaction().begin();
		User c = new User();
		c = entity.find(User.class, id);
		
		entity.getTransaction().commit();
		entity.flush();
		return c;
	}
	
	public User buscar(String email) {
		entity.getTransaction().begin();
		User c = new User();
		Query q = entity.createQuery("SELECT u FROM User AS u where u.email LIKE :emailparam", User.class).setParameter("emailparam", email).setMaxResults(1);
		if(!q.getResultList().isEmpty()) {
			c = (User) q.getResultList().get(0);
		}
		entity.getTransaction().commit();
		return c;
	}

	public void eliminar(Long id) {
		User c = new User();
		c = entity.find(User.class, id);
		entity.getTransaction().begin();
		entity.remove(c);
		entity.getTransaction().commit();
	}

	
	public List<User> obtenerUsuarios() {
		List<User> listaClientes = new ArrayList<>();
		Query q = entity.createQuery("SELECT c FROM User c");
		listaClientes = q.getResultList();
		return listaClientes;
	}

}
