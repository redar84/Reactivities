using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Application.User
{
    public class User
    {
        
        public string DisplayName { get; set; }
       
        public string Username { get; set; }
       
        public string Token { get; set; }
        
        public string Image { get; set; }
    }
}
