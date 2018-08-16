const shapeTable = {
  byId: {
    0: '/dumbpics/circle.png',
    1: '/dumbpics/octagon.jpg',
    2: '/dumbpics/square.png',
    3: '/dumbpics/triangle.jpg'
  }
}

const animalTable = {
  byId: {
    0: '/dumbpics/dino.png',
    1: '/dumbpics/bear.png',
    2: '/dumbpics/penguin.png',
    3: '/dumbpics/snails.png'
  }
}

export const getShapeById = (interactionId, numParticipants) => {
  return shapeTable.byId[interactionId % numParticipants]
}
export const getAnimalById = (interactionId, numParticipants) => {
  return animalTable.byId[interactionId % numParticipants]
}
