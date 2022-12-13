package com.springboot.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TableParams {
    private String table_name;
    private Integer capacity;
    private String[] categories;
    private Integer page;
    private Integer limit;
}

