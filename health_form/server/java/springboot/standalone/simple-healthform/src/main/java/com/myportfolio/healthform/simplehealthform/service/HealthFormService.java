package com.myportfolio.healthform.simplehealthform.service;

import com.myportfolio.healthform.simplehealthform.KVTemplates.ErrorResponse;
import com.myportfolio.healthform.simplehealthform.entities.UserTemp;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class HealthFormService {
    public void NewUserTemp(UserTemp user_temp) throws Exception {

        if (user_temp.getName() == null || user_temp.getName() == "") {
            throw new ErrorResponse("Missing required parameter 'name'");
        }

        if (user_temp.getName().length() >= 200) {
            throw new ErrorResponse("Too long value for parameter 'name'");
        }

        if (user_temp.getTemperature() < 20 || user_temp.getTemperature() > 200) {
            throw new ErrorResponse("Invalid value for parameter 'temperature'");
        }

        System.out.println("Should save to repository:: " + user_temp.toString());
    }
}
