package com.springboot.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
@Entity
@Table(name = "tables")

public class Mesa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "table_name")
    private String table_name;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "available")
    private Boolean available;

    @Column(name = "image")
    private String image;

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })

    @JoinTable(name = "categories_tables", joinColumns = { @JoinColumn(name = "id_table") }, inverseJoinColumns = {
            @JoinColumn(name = "id_category") })

    private Set<Category> categories = new HashSet<>();

    public Mesa() { }

    public Mesa(String table_name, Integer capacity, Boolean available, String image) {
        this.table_name = table_name;
        this.capacity = capacity;
        this.available = available;
        this.image = image;
    }

    public Set<Category> getCategories() {
        return this.categories;
    }

    public long getId() {
        return this.id;
    }

    public String getTable_name() {
        return this.table_name;
    }

    public Integer getCapacity() {
        return this.capacity;
    }

    public Boolean isAvailable() {
        return this.available;
    }

    public Boolean getavailable() {
        return this.available;
    }

    public String getImage() {
        return this.image;
    }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", table_name='" + getTable_name() + "'" +
                ", capacity='" + getCapacity() + "'" +
                ", available='" + isAvailable() + "'" +
                ", image='" + getImage() + "'" +
                "}";
    }
}