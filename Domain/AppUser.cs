using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        [JsonPropertyNameAttribute("displayName")]
        public string DisplayName { get; set; }

        public virtual ICollection<UserActivity> UserActivities { get; set; }

    }
}
