package com.myportfolio.healthform.simplehealthform.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTemp {
    private String name;
    private int temperature;
    private boolean symptomatic;
    private boolean in_contact;
}
