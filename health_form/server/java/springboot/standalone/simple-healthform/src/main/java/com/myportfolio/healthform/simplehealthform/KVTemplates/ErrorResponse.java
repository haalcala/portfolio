package com.myportfolio.healthform.simplehealthform.KVTemplates;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ErrorResponse extends Exception {
    public ErrorResponse() {
        super();
    }

    public ErrorResponse(String message) {
        super(message);
    }

    public int error_code;

    public String error_message;
}
