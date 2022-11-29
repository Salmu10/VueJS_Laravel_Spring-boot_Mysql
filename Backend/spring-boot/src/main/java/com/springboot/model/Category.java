package com.springboot.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "categories")

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "category_name")
    private String category_name;

    @Column(name = "image")
    private String image;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    }, mappedBy = "categories")
    @JsonIgnore
    private Set<Mesa> tables = new HashSet<>();

    public Category() { }

    public Category(String category_name, String image) {
        this.category_name = category_name;
        this.image = image;
    }

    public Set<Mesa> getTables() {
        return this.tables;
    }

    public long getId() {
        return this.id;
    }

    public String getCategory_name() {
        return this.category_name;
    }

    public String getImage() {
        return this.image;
    }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", category_name='" + getCategory_name() + "'" +
                ", image='" + getImage() + "'" +
                "}";
    }

}