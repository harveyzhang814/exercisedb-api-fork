/**
 * ExerciseDB API - Fitness Exercise Database API
 * Copyright (C) 2025 AscendAPI
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 * 
 * This is a fork of the original ExerciseDB API project.
 * Original repository: https://github.com/exercisedb/exercisedb-api
 */

import { BodyPartController, EquipmentController, ExerciseController, MuscleController } from './modules'
import { App } from './app'

const app = new App([
  new ExerciseController(),
  new MuscleController(),
  new EquipmentController(),
  new BodyPartController()
]).getApp()

export default {
  fetch: app.fetch,
  port: 80
}
