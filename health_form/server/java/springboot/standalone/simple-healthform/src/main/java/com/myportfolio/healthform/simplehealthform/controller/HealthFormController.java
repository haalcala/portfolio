package com.myportfolio.healthform.simplehealthform.controller;

import com.myportfolio.healthform.simplehealthform.KVTemplates.SuccessResponse;
import com.myportfolio.healthform.simplehealthform.entities.UserTemp;
import com.myportfolio.healthform.simplehealthform.service.HealthFormService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class HealthFormController {
    @Autowired
    private HealthFormService healthFormService;

    @PostMapping("/api/v1/user_temp")
    public SuccessResponse NewUserTemplate(@RequestBody() UserTemp user_temp) throws Exception {

        healthFormService.NewUserTemp(user_temp);

        return new SuccessResponse();
    }
}
