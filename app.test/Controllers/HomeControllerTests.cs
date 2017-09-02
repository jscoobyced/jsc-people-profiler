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
        public async void IndexNullTest()
        {
            var result = await new HomeController(null)
                .WithPageService()
                .Index();

            result
                .Should().NotBeNull(
                    "HomeController.Index should return a non-null IActionResult: {0}",
                     result);
        }

        [Fact]
        public async void IndexTest()
        {
            var result = await new HomeController(null)
                .WithNormalPageService()
                .Index();

            result
                .Should().NotBeNull(
                    "HomeController.Index should return a non-null IActionResult: {0}",
                     result);
            result
                .Should().BeAssignableTo<ViewResult>("HomeController.Index should return a ViewResult");

            /*
                        var viewResult = (ViewResult)result;
                        viewResult
                            .Model
                            .Should().NotBeNull();
                        viewResult
                            .Model
                            .Should().BeAssignableTo(typeof(Page));
                            */
        }
    }
}