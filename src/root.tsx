import {
  registerSidebarTool,
  watchCardData,
  viewportTranslate,
  getCardData,
  getCardsIndex,
  getLineData,
  getLinesIndex,
  LineData
} from "@whiteboards-io/plugins";
import {useEffect} from "react";

export function Root() {
  useEffect(() => {
    const baseUrl = window.location.origin + window.location.pathname.replace(/^\/$/, '');

    registerSidebarTool({
      id: "plugin-shortcut",
      icon: baseUrl + "icon.jpeg",
      tooltip: "Shortcut",
      contentUrl: baseUrl + "?sidebar"
    })

    const id = (obj: any) => obj;

    const getFirstConnectedCardId = async (cardId: string) => {
      const lineIds = await getLinesIndex();
      const lines = (await Promise.all(lineIds.map(id => getLineData(id)))).filter(id) as LineData[];

      let connectedCardIds = (
        lines.filter(line => line.startCardId === cardId)
          .map(line => line.endCardId)
          .filter(id)) as string[];
      connectedCardIds = connectedCardIds.concat((
        lines.filter(line => line.endCardId === cardId)
          .map(line => line.startCardId)
          .filter(id)) as string[]
      );

      if (connectedCardIds.length === 0) {
        console.warn("Shortcut plugin: no detected cards found for card " + cardId);
        return null;
      }
      return connectedCardIds[0];
    };

    const getCardCoordinates = async (cardId: string) => {
      const cardData = await getCardData(cardId);
      if (!cardData){
        console.warn("Shortcut plugin: could not find card with id " + cardId);
        return null;
      }

      return [cardData.x, cardData.y] as [number, number];
    };

    const addShortcutBehavior = (cardId: string) => {
      watchCardData(cardId, async () => {
        const targetId = await getFirstConnectedCardId(cardId); //"1669632296632"
        if (!targetId) return;
        const coordinates = await getCardCoordinates(targetId);
        if (!coordinates) return;

        viewportTranslate({
          animationDuration: 1,
          recommendedZoom: 1,
          translate: coordinates
        });
      });
    };

    getCardsIndex()
      .then(cardIds => Promise.all(cardIds.map(cardId => getCardData(cardId))))
      .then(cards => cards.filter(card => card?.shortcut).forEach(card => {
        if (card) addShortcutBehavior(card.id as string)
      }));

    getCardsIndex()
      .then(cardIds => Promise.all(cardIds.map(cardId => getCardData(cardId))))
      .then(cards => cards.filter(card => card?.shortcut).forEach(card => {
        if (card) addShortcutBehavior(card.id as string)
      }));
  }, []);

  return null;
}

