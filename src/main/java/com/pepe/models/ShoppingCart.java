package com.pepe.models;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "shoppingcart")
@XmlRootElement
public class ShoppingCart implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "shoppingcart_id")
    private Long id;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "shoppingCart", cascade = CascadeType.ALL)
    @Column(name = "shoppingcart_cartitems")
    private Set<CartItem> cartItems;


    // Lo he metido nuevo
    @JoinColumn(name = "shoppingcart_user_id")
    private Long user;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Set<CartItem> getCartItems() {
		return cartItems;
	}


	public void setCartItems(Set<CartItem> cartItems) {
		this.cartItems = cartItems;
	}


	public Long getUser() {
		return user;
	}


	public void setUser(Long user) {
		this.user = user;
	}


	@Override
	public String toString() {
		return "ShoppingCart [id=" + id + ", cartItems=" + cartItems + ", user=" + user + "]";
	}
	
	
}
