using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User>
        {

        }

        public class Handler : IRequestHandler<Query, User>
        {
            readonly UserManager<AppUser> _userManger;
            readonly IJwtGenerator _jwtGenerator;
            readonly IUserAccessor _userAccessor;
            public Handler(UserManager<AppUser> userManger, IJwtGenerator jwtGenerator,
                IUserAccessor userAccessor)
            {
                _userManger = userManger;
                _jwtGenerator = jwtGenerator;
                _userAccessor = userAccessor;
            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManger.FindByNameAsync(_userAccessor.GetCurrentUsername());

                return new User {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Token = _jwtGenerator.CreateToken(user),
                    Image=null
                    
            };
            }
        }
    }
}
