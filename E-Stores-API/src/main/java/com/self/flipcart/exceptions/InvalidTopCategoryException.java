package com.self.flipcart.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InvalidTopCategoryException extends RuntimeException {
   private String message;
}
