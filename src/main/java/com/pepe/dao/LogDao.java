package com.pepe.dao;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.pepe.models.JPAUtil;
import com.pepe.models.Log;


public class LogDao {

	EntityManager entity = JPAUtil.getEntityManagerFactory().createEntityManager();

	public void guardar(Log l) {
		entity.getTransaction().begin();
		entity.persist(l);
		entity.getTransaction().commit();
		entity.clear();
	}
	

	public Log buscar(Long id) {
		Log l = new Log();
		l = entity.find(Log.class, id);
		return l;
	}

	public void eliminar(Long id) {
		Log l = new Log();
		l = entity.find(Log.class, id);
		entity.getTransaction().begin();
		entity.remove(l);
		entity.getTransaction().commit();
	}

	public List<Log> obtenerLogs() {
		List<Log> listaLogs = new ArrayList<>();
		Query q = entity.createQuery("SELECT l FROM Log l");
		listaLogs = q.getResultList();
		return listaLogs;
	}
	
	public List<Log> obtenerLogs(String typeLog) {
		List<Log> listaLogs = new ArrayList<>();
		Query q = entity.createQuery("SELECT l FROM Log l WHERE l.type LIKE: t").setParameter("t", typeLog);
		listaLogs = q.getResultList();
		return listaLogs;
	}
	
}
