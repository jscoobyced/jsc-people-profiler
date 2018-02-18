namespace app.web.Controllers.Tests
{
    using System;
    using System.Diagnostics;
    using app.web.Models;
    using app.web.Services.Test;
    using FluentAssertions;
    using Microsoft.AspNetCore.Mvc;
    using Xunit;

    public class HomeControllerTests
    {
        [Fact]
        public void IndexTest()
        {
            var result = new HomeController().Index();

            result
                .Should().NotBeNull(
                    "HomeController.Index should return a non-null IActionResult: {0}",
                     result);
            result
                .Should().BeAssignableTo<ViewResult>("HomeController.Index should return a ViewResult");
        }
    }
}