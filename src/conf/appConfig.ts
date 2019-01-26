const appConfig = {
    circlePacking: {
        centeringPasses: 1,
        collisionPasses: 1,
        damping: 0.025 / 4,
    },

    corpusAnalyzer: {
        /**
         * minimumOccurrencesForCombiningEntities: The minimal occurrence number of an entity, for it to be combined with any other entity.
         */
        minimumOccurrencesForCombiningEntities: 3,
        /**
         * minimumOccurrencesForEntityToBeMeaningful: The minimal occurrence number of an entity,
         * for it to appear in any output of the entity extraction algorithm
         */
        minimumOccurrencesForEntityToBeMeaningful: 2,
    },
};

export default appConfig;
