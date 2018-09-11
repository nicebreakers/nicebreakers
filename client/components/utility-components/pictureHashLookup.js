const shapeTable = {
  byId: {
    0: '/media/star.svg',
    1: '/media/triangle.svg',
    2: '/media/square.svg',
    3: '/media/circle.svg'
  }
}

const animalTable = {
  byId: {
    0: '/media/cat.svg',
    1: '/media/butterfly.svg',
    2: '/media/paw.svg',
    3: '/media/rabbit.svg'
  }
}

const transTable = {
  byId: {
    0: '/media/ship.svg',
    1: '/media/car.svg',
    2: '/media/monster.svg',
    3: '/media/tractor.svg'
  }
}

export const getShapeById = (interactionId, numParticipants) => {
  return shapeTable.byId[interactionId % numParticipants]
}
export const getAnimalById = (interactionId, numParticipants) => {
  return animalTable.byId[interactionId % numParticipants]
}
export const getCarById = (interactionId, numParticipants) => {
  return transTable.byId[interactionId % numParticipants]
}
