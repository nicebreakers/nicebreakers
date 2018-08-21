const shapeTable = {
  byId: {
    0: '/gamepics/circle.png',
    1: '/gamepics/octagon.jpg',
    2: '/gamepics/square.png',
    3: '/gamepics/triangle.jpg'
  }
}

const animalTable = {
  byId: {
    0: '/gamepics/dino.png',
    1: '/gamepics/bear.png',
    2: '/gamepics/penguin.png',
    3: '/gamepics/snails.png'
  }
}

const carTable = {
  byId: {
    0: '/gamepics/rolls_royce.jpg',
    1: '/gamepics/convertable.jpg',
    2: '/gamepics/t_bird.jpg',
    3: '/gamepics/lamborghini.jpg'
  }
}

export const getShapeById = (interactionId, numParticipants) => {
  return shapeTable.byId[interactionId % numParticipants]
}
export const getAnimalById = (interactionId, numParticipants) => {
  return animalTable.byId[interactionId % numParticipants]
}
export const getCarById = (interactionId, numParticipants) => {
  return carTable.byId[interactionId % numParticipants]
}
