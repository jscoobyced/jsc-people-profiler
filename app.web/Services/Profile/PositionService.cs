namespace app.web.Services
{
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Repositories;

    public class PositionService : IPositionService
    {
        private IDatabaseRepository _databaseRepository;

        public PositionService(IDatabaseRepository databaseRepository)
        {
            this._databaseRepository = databaseRepository;
        }

        public IDatabaseRepository DatabaseRepository
        {
            set
            {
                this._databaseRepository = value;
            }
        }

        public async Task<List<Position>> GetPositionsAsync()
        {
            string commandText = @"SELECT id, name
                FROM `position`
                ORDER BY id";
            var positions = await this._databaseRepository.ExecuteReadList<Position>(
                commandText, null, this.ReadPositionList);
            return positions;
        }

        private void ReadPositionList(DbDataReader reader, List<Position> positions)
        {
            positions.Add(this.ReadPosition(reader));
        }

        private Position ReadPosition(DbDataReader reader)
        {
            var position = new Position();
            position.Id = reader.GetInt32(reader.GetOrdinal("id"));
            position.Name = reader.GetString(reader.GetOrdinal("name"));
            return position;
        }

    }
}