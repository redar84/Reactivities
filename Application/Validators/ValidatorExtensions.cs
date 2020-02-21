using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T,string>Password<T>(this IRuleBuilder<T,string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("Password Must Be greater than 6")
                .Matches("[A-Z]")
                .WithMessage("Password Must Contain one Upper Case Letter")
                .Matches("[a-z]").WithMessage("Password must have at least 1 lower case character")
                .Matches("[0-9]").WithMessage("Password must contains number")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain non-alphanumeric");

            return options;
        }
    }
}
