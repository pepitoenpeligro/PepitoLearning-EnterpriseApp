package com.pepe.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.pepe.models.CartItem;
import com.pepe.models.JPAUtil;
import com.pepe.models.Product;
import com.pepe.models.ShoppingCart;
import com.pepe.models.User;

public class ShoppingCartDao {
	EntityManager entity = JPAUtil.getEntityManagerFactory().createEntityManager();
	
	public void addProductToUserCart(Long idProducto, String email) {
		entity.getTransaction().begin();
		// Obtener el usuario
		UserDao ud = new UserDao();
		User u = ud.buscar(email);
		System.out.println("[addProductToUserCart]{1}" + u.getEmail() + " "+ u.getId());
		
		// Obtener el producto
		ProductDao pd = new ProductDao();
		Product p = pd.buscar(idProducto);
		
		
		// Obtener ShoppingCart <idShopping, idUser>
		
		
		
		
		// Buscar si existe->
		ShoppingCart sc = new ShoppingCart();
		/*String sql = "select s.id, s.user from Shoppingcart s where s.user = ?";
		Query q = entity.createNativeQuery(sql);*/
		Query q = entity.createQuery("SELECT s FROM ShoppingCart AS s where s.user LIKE :userparam", ShoppingCart.class);
		q.setParameter("userparam",u.getId());
		q.setMaxResults(1);
		if(!q.getResultList().isEmpty()) {
			System.out.println("@@@@@");
			System.out.println(q.getResultList().get(0));
			System.out.println(q.getResultList().get(0).toString());
			sc = (ShoppingCart) q.getResultList().get(0);
		}else {
			sc.setUser(u.getId());
		
			entity.persist(sc);
		}
		
		System.out.println("[addProductToUserCart]{2}" + sc.getId() + " "+ sc.getCartItems());
		entity.getTransaction().commit();
		entity.clear();
		
		
		entity.getTransaction().begin();
		// Añadir CartItem <idCartItem, productId, Cantidad, idShoppingCart>
		CartItem ci = new CartItem();
		ci.setProductId(p.getId());
		ci.setShoppingCart(sc);
		entity.merge(ci);
		
		entity.getTransaction().commit();
		entity.clear();
		
	}
	
	public List<Product> getProducts(String email){
		List<Product> listaProductos = new ArrayList<>();
		UserDao ud = new UserDao();
		User u = ud.buscar(email);
		String sql = "SELECT p.product_id, p.product_description, p.product_name, p.product_price FROM shoppingcart s, cartitem c, products p WHERE s.shoppingcart_id = c.cartitem_shoppingcart_id and p.product_id = c.cartitem_product_id and s.user = ?";
		//String sql = "select p.id, description, name, p.price from shoppingcart s, cartitem c, products p where s.id = c.id and p.id= c.product_id";
		Query q = entity.createNativeQuery(sql);
		q.setParameter(1,u.getId());
		if(!q.getResultList().isEmpty()) {
			listaProductos = q.getResultList();
		}
		
		System.out.println("[shoppincarDAO]" + listaProductos.toString());
		return listaProductos;
		
	}
}
