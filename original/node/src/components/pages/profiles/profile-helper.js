var ProfileHelper = (function () {
    function ProfileHelper() {
        var _this = this;
        this.toViewModels = function (profiles, positions) {
            profiles.map(function (profile) {
                profile = _this.toViewModel(profile, positions);
            });
            return profiles;
        };
    }
    ProfileHelper.prototype.toViewModel = function (profile, positions) {
        if (profile == null) {
            profile = {
                id: 0,
                firstName: '',
                lastName: '',
                startDate: new Date(),
                position: 1,
                status: 1,
                characteristics: [],
                skills: []
            };
        }
        profile.startDate = new Date(profile.startDate);
        positions.forEach(function (position) {
            if (position.id === profile.position) {
                profile.positionName = position.name;
            }
        });
        return profile;
    };
    return ProfileHelper;
}());
export { ProfileHelper };
//# sourceMappingURL=profile-helper.js.map