let theDiscard = [];
let theShoe = [];
let playerWinningHands = 0;
let bankerWinningHands = 0;
let tieHands = 0;
let dragon7Hands = 0;
let panda8Hands = 0;
let totalHands = 0;
let myRunningChipTotal = 1000;

document.getElementById("dealButton").disabled = true;

function explainTheGame() {
  console.log("WELCOME TO BACCARAT EASILY!!!");
  console.log("To play baccarat, you must bet on a side, Player or Banker.");
  console.log("Whichever side gets closest to 9, without going over wins!");
  console.log("You cannot bet on BOTH the player and the banker. Either or.");
  console.log("The Dragon, Tie, and Panda bets are optional.");
  console.log("The Dragon is a bet that the bank wins with a three card 7.");
  console.log("The Tie is a bet that the player and banker tie.");
  console.log("The Panda is a bet that the Player wins with an 8.");
  console.log("Let's shuffle!");
  console.log("Press the Shuffle the Deck button to shuffle.");
  console.log("Then make your bets.");
  console.log("Press Deal to deal one hand.");
}

function createShoe() {
  theDiscard = [];
  theShoe = [];
  createTheShoe();
  shuffleTheCards(theShoe);
  burnCards(theShoe, theDiscard);

  function card(name, suit, value, deck, image) {
    this.name = name;
    this.suit = suit;
    this.value = value > 10 ? 0 : value;
    this.deck = deck;
    this.image = image;
  }

  function createTheShoe() {
    this.names = [
      "Ace",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Jack",
      "Queen",
      "King"
    ];

    this.images = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K"
    ];

    this.suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
    this.decks = 8;
    if (theShoe.length === 0) {
      for (let deck = 1; deck <= this.decks; deck++) {
        for (let suit = 0; suit < suits.length; suit++) {
          for (let name = 0; name < names.length; name++) {
            theShoe.push(
              new card(
                this.names[name],
                this.suits[suit],
                name + 1,
                deck,
                this.images[name]
              )
            );
          }
        }
      }
    }
    // console.log("The shoe length is:", theShoe.length);
    // console.log("The shoe BEFORE shuffling is:", theShoe);
    return theShoe;
  }

  function shuffleTheCards(theShoe) {
    // console.log("shuffleTheCards fires");
    // console.log("theShoe[0] BEFORE shuffling is:", theShoe[0]);
    // console.log("theShoe[400] BEFORE shuffling is:", theShoe[400]);
    // console.log("shuffleTheCards for loop fires");
    for (let i = 0; i < 1000; i++) {
      let location1 = Math.floor(Math.random() * theShoe.length);
      let location2 = Math.floor(Math.random() * theShoe.length);
      let temp = theShoe[location1];
      theShoe[location1] = theShoe[location2];
      theShoe[location2] = temp;
    }
    // console.log("theShoe AFTER shuffling is:", theShoe);
    // console.log("theShoe[0] AFTER shuffling is:", theShoe[0]);
    // console.log("theShoe[400] AFTER shuffling is:", theShoe[400]);
  }

  function burnCards(theShoe, theDiscard) {
    // console.log("burnCards fires");
    // console.log("theDiscard=", theDiscard);
    // console.log("theShoe[0].value=", theShoe[0].value);
    let numBurnCards = theShoe[0].value === 0 ? 10 : theShoe[0].value;
    // console.log("The BURN CARD is the", theShoe[0].name, "of", theShoe[0].suit);
    // console.log("The number of burn cards is:", theShoe[0].value);
    // console.log("numBurnCards=", numBurnCards);
    theDiscard.push(theShoe.shift());
    for (let i = 1; i <= numBurnCards; i++) {
      // console.log("burnCards for loop fires");
      // console.log("The number", i, "burnED card was", theShoe[0]);
      theDiscard.push(theShoe.shift());
    }
    document.getElementById("dealButton").disabled = false;
    document.querySelector("#myChipTotal").innerHTML = myRunningChipTotal;

    // console.log("theShoe.length=", theShoe.length);
    // console.log("theDiscard.length=", theDiscard.length);
    // console.log("TheDiscard is:", theDiscard);
    // console.log("------------------------------------->");
  }
}

//-----------------------------------------------------------------------------------

function dealAHand(theShoe, theDiscard) {
  // console.log("dealAHand fires");

  let playerTotal = null;
  let bankerTotal = null;
  let playerWins = false;
  let bankerWins = false;
  let resultIsADragon = false;
  let resultIsATie = false;
  let resultIsAPanda = false;
  let playerTotalCards = 0;
  let bankerTotalCards = 0;
  let playerHand = [];
  let bankerHand = [];
  let playerBet = 0;
  let bankerBet = 0;
  let dragonBet = 0;
  let tieBet = 0;
  let pandaBet = 0;

  document.querySelector("#playerFirst .suit").innerHTML = "";
  document.querySelector("#playerFirst .image").innerHTML = "";
  document.querySelector("#playerSecond .suit").innerHTML = "";
  document.querySelector("#playerSecond .image").innerHTML = "";
  document.querySelector("#bankerFirst .suit").innerHTML = "";
  document.querySelector("#bankerFirst .image").innerHTML = "";
  document.querySelector("#bankerSecond .suit").innerHTML = "";
  document.querySelector("#bankerSecond .image").innerHTML = "";
  document.querySelector("#playerThird .suit").innerHTML = "";
  document.querySelector("#playerThird .image").innerHTML = "";
  document.querySelector("#bankerThird .suit").innerHTML = "";
  document.querySelector("#bankerThird .image").innerHTML = "";

  // document.querySelector("#playerThird").classList.toggle("hidden");
  // document.querySelector("#bankerThird").classList.toggle("hidden");

  document
    .querySelector("#playerFirst")
    .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
  document
    .querySelector("#playerSecond")
    .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
  document
    .querySelector("#bankerFirst")
    .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
  document
    .querySelector("#bankerSecond")
    .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
  document
    .querySelector("#playerThird")
    .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
  document
    .querySelector("#bankerThird")
    .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");

  // document.querySelector("#playerFirst").classList.toggle("hidden");
  // document.querySelector("#playerSecond").classList.toggle("hidden");
  // document.querySelector("#bankerFirst").classList.toggle("hidden");
  // document.querySelector("#bankerSecond").classList.toggle("hidden");
  // document.querySelector("#playerThird").classList.toggle("hidden");
  // document.querySelector("#bankerThird").classList.toggle("hidden");

  dealFirstFourCards(theShoe);

  function dealFirstFourCards(theShoe) {
    // console.log("dealFirstFourCards fires");
    // console.log("theShoe.length=", theShoe.length);
    // console.log("theDiscard.length=", theDiscard.length);
    // console.log("totalHands=", totalHands);
    // console.log("Hand Number=", totalHands + 1);

    playerHand.push(theShoe.shift());
    playerTotalCards++;

    bankerHand.push(theShoe.shift());
    bankerTotalCards++;

    playerHand.push(theShoe.shift());
    playerTotalCards++;

    bankerHand.push(theShoe.shift());
    bankerTotalCards++;

    // console.log("playerTotalCards:", playerTotalCards);
    // console.log("bankerTotalCards:", bankerTotalCards);
    // console.log("playerHand:", playerHand);
    // console.log("bankerHand:", bankerHand);

    showFirstFourCards(playerHand, bankerHand);
  }

  function suitChanger(suit) {
    if (suit === "Spades") {
      return "&spades;";
    } else if (suit === "Hearts") {
      return "&hearts;";
    } else if (suit === "Clubs") {
      return "&clubs;";
    } else if (suit === "Diamonds") {
      return "&diams;";
    }
  }

  function showFirstFourCards(playerHand, bankerHand) {
    // console.log("showFirstFourCards fires");

    if (playerHand[0]) {
      document.querySelector("#playerFirst .suit").innerHTML = suitChanger(
        playerHand[0].suit
      );
      document.querySelector("#playerFirst .image").innerHTML =
        playerHand[0].image;
      document.querySelector("#playerFirst").classList.add(playerHand[0].suit);
    }
    if (playerHand[1]) {
      document.querySelector("#playerSecond .suit").innerHTML = suitChanger(
        playerHand[1].suit
      );
      document.querySelector("#playerSecond .image").innerHTML =
        playerHand[1].image;
      document.querySelector("#playerSecond").classList.add(playerHand[1].suit);
    }
    if (bankerHand[0]) {
      document.querySelector("#bankerFirst .suit").innerHTML = suitChanger(
        bankerHand[0].suit
      );
      document.querySelector("#bankerFirst .image").innerHTML =
        bankerHand[0].image;
      document.querySelector("#bankerFirst").classList.add(bankerHand[0].suit);
    }
    if (bankerHand[1]) {
      document.querySelector("#bankerSecond .suit").innerHTML = suitChanger(
        bankerHand[1].suit
      );
      document.querySelector("#bankerSecond .image").innerHTML =
        bankerHand[1].image;
      document.querySelector("#bankerSecond").classList.add(bankerHand[1].suit);
    }

    totalTheHands(playerTotal, bankerTotal, playerHand, bankerHand);
  }

  function totalTheHands(playerTotal, bankerTotal, playerHand, bankerHand) {
    // console.log("totalTheHands fires");
    // console.log("theShoe.length:", theShoe.length);
    // console.log("playerHand:", playerHand);
    // console.log("bankerHand:", bankerHand);

    playerTotal = (playerHand[0].value + playerHand[1].value) % 10;

    // console.log("The player's total is:", playerTotal);

    bankerTotal = (bankerHand[0].value + bankerHand[1].value) % 10;

    // console.log("The banker's total is:", bankerTotal);

    compareHandsForNaturals(playerTotal, bankerTotal);
  }

  function compareHandsForNaturals(playerTotal, bankerTotal) {
    // console.log("compareHandsForNaturals fires");
    if (
      playerTotal === 8 ||
      playerTotal === 9 ||
      bankerTotal === 8 ||
      bankerTotal === 9
    ) {
      // console.log("natruals if loop fires - natural detected");
      compareHandsFinal(playerTotal, bankerTotal, playerHand, bankerHand);
    } else {
      drawThirdCards(playerTotal, bankerTotal);
    }
  }

  function drawThirdCards(playerTotal, bankerTotal) {
    // console.log("drawThirdCards fires");
    if (playerTotal <= 5) {
      playerHand.push(theShoe.shift());
      // console.log("Player<=5 fires");
      // console.log("The player's third card is:", playerHand[2]);
      // console.log("The player has:", playerHand);
      playerTotalCards++;
    }
    if (!playerHand[2]) {
      // console.log("!playerHand[2] fires");
      if (bankerTotal <= 5) {
        bankerHand.push(theShoe.shift());
        // console.log("bankerTotal<=5 fires");
        // console.log("The banker's third card is:", bankerHand[2]);
        // console.log("The banker has:", bankerHand);
        bankerTotalCards++;
      }
    }
    if (playerHand[2]) {
      if (bankerTotal === 0 || bankerTotal === 1 || bankerTotal === 2) {
        bankerHand.push(theShoe.shift());
        // console.log("Banker 0 1 2 fires");
        // console.log("The banker's third card is:", bankerHand[2]);
        // console.log("The banker has:", bankerHand);
        bankerTotalCards++;
      } else if (bankerTotal === 3 && playerHand[2].value !== 8) {
        bankerHand.push(theShoe.shift());
        // console.log("Banker 3 fires");
        // console.log("The banker's third card is:", bankerHand[2]);
        // console.log("The banker has:", bankerHand);
        bankerTotalCards++;
      } else if (bankerTotal === 3 && playerHand[2].value === 8) {
        // console.log("Banker 3 vs 8 exception fires");
        // console.log("The banker has:", bankerHand);
      } else if (
        bankerTotal === 4 &&
        [2, 3, 4, 5, 6, 7].includes(playerHand[2].value)
      ) {
        bankerHand.push(theShoe.shift());
        // console.log("Banker 4 fires");
        // console.log("The banker's third card is:", bankerHand[2]);
        // console.log("The banker has:", bankerHand);
        bankerTotalCards++;
      } else if (
        bankerTotal === 5 &&
        [4, 5, 6, 7].includes(playerHand[2].value)
      ) {
        bankerHand.push(theShoe.shift());
        // console.log("Banker 5 fires");
        // console.log("The banker's third card is:", bankerHand[2]);
        // console.log("The banker has:", bankerHand);
        bankerTotalCards++;
      } else if (bankerTotal === 6 && [6, 7].includes(playerHand[2].value)) {
        bankerHand.push(theShoe.shift());
        // console.log("Banker 6 fires");
        // console.log("The banker's third card is:", bankerHand[2]);
        // console.log("The banker has:", bankerHand);
        bankerTotalCards++;
      }
    }
    // console.log("theShoe.length:", theShoe.length);

    playerTotal = playerHand[2]
      ? (playerHand[0].value + playerHand[1].value + playerHand[2].value) % 10
      : (playerHand[0].value + playerHand[1].value) % 10;

    // console.log("The player's total is:", playerTotal);

    bankerTotal = bankerHand[2]
      ? (bankerHand[0].value + bankerHand[1].value + bankerHand[2].value) % 10
      : (bankerHand[0].value + bankerHand[1].value) % 10;

    // console.log("The banker's total is:", bankerTotal);

    showThirdCards(playerHand, bankerHand, playerTotal, bankerTotal);
  }

  function showThirdCards(playerHand, bankerHand, playerTotal, bankerTotal) {
    // console.log("showThirdCards fires");
    if (playerHand[2]) {
      document.querySelector("#playerThird .suit").innerHTML = suitChanger(
        playerHand[2].suit
      );
      document.querySelector("#playerThird .image").innerHTML =
        playerHand[2].image;
      document.querySelector("#playerThird").classList.add(playerHand[2].suit);
      // document.querySelector("#playerThird").classList.toggle("hidden");
    }
    if (bankerHand[2]) {
      document.querySelector("#bankerThird .suit").innerHTML = suitChanger(
        bankerHand[2].suit
      );
      document.querySelector("#bankerThird .image").innerHTML =
        bankerHand[2].image;
      document.querySelector("#bankerThird").classList.add(bankerHand[2].suit);
      // document.querySelector("#bankerThird").classList.toggle("hidden");
    }
    // console.log("bankerTotal=", bankerTotal, "playerTotal=", playerTotal);

    compareHandsFinal(
      playerTotal,
      bankerTotal,
      playerHand,
      bankerHand,
      playerBet,
      bankerBet
    );
  }

  function compareHandsFinal(
    playerTotal,
    bankerTotal,
    playerHand,
    bankerHand,
  ) {
    // console.log("compareHandsFinal fires");
    // console.log("The player's total is:", playerTotal);
    // console.log("The banker's total is:", bankerTotal);
    // console.log("bankerHand=", bankerHand);
    // console.log("playerHand=", playerHand);
    if (playerTotal > bankerTotal) {
      playerWins = true;
    } else if (playerTotal < bankerTotal) {
      bankerWins = true;
    } else if (playerTotal === bankerTotal) {
      resultIsATie = true;
      console.log("It is a TIE. The bank and player both have", bankerTotal);
    }

    // console.log("bankerTotal=", bankerTotal);
    // console.log("playerTotal=", playerTotal);
    // console.log("bankerHand=", bankerHand);
    // console.log("playerHand=", playerHand);
    // console.log("playerWins=", playerWins);
    // console.log("bankerWins=", bankerWins);
    // console.log("resultIsATie=", resultIsATie);

    bonusHands(
      bankerTotal,
      playerTotal,
      playerTotalCards,
      bankerTotalCards,
      playerWins,
      bankerWins,
      resultIsATie,
      playerHand,
      bankerHand
    );
  }

  function bonusHands(
    bankerTotal,
    playerTotal,
    playerTotalCards,
    bankerTotalCards,
    playerWins,
    bankerWins,
    resultIsATie,
    playerHand,
    bankerHand
  ) {
    // console.log("myRunningChipTotal=", myRunningChipTotal);
    // console.log("bonusHands fires");
    // console.log("bankerTotal=", bankerTotal);
    // console.log("playerTotal=", playerTotal);
    // console.log("playerTotalCards=", playerTotalCards);
    // console.log("bankerTotalCards=", bankerTotalCards);
    // console.log("playerWins=", playerWins);
    // console.log("bankerWins=", bankerWins);
    // console.log("resultIsATie=", resultIsATie);
    // console.log("bankerHand=", bankerHand);
    // console.log("playerHand=", playerHand);
    if (resultIsATie === true) {
      console.log("TIE PAYS 8 TO 1");
      console.log(".You win", tieBet * 8, "dollars.");
    } else if (
      bankerWins === true &&
      bankerTotalCards === 3 &&
      bankerTotal === 7 &&
      bankerHand[2].value === 1
    ) {
      resultIsADragon = true;
      console.log("Rare Dragon!");
      console.log("DRAGON 7 PAYS 40 TO 1!!!");
      console.log(".You win", dragonBet * 40, "dollars.");
      dragon7Hands++;
    } else if (
      bankerWins === true &&
      bankerTotalCards === 3 &&
      bankerTotal === 7
    ) {
      resultIsADragon = true;
      console.log("DRAGON 7 PAYS 40 TO 1!!!");
      console.log(".You win", dragonBet * 40, "dollars.");
      dragon7Hands++;
    } else if (
      playerWins === true &&
      playerTotalCards === 3 &&
      playerTotal === 8 &&
      bankerTotalCards === 3 &&
      bankerTotal === 7
    ) {
      resultIsAPanda = true;
      console.log("Panda kills the Dragon!");
      console.log("PANDA 8 PAYS 25 TO 1!!!");
      console.log(".You win", pandaBet * 25, "dollars.");
      panda8Hands++;
    } else if (
      playerWins === true &&
      playerTotalCards === 3 &&
      playerTotal === 8
    ) {
      resultIsAPanda = true;
      console.log("PANDA 8 PAYS 25 TO 1!!!");
      console.log(".You win", pandaBet * 25, "dollars.");
      panda8Hands++;
    } else if (
      playerTotal === 7 &&
      playerTotalCards === 2 &&
      bankerTotal === 6 &&
      bankerTotalCards === 2
    ) {
      // console.log("Player BBQ's banker!");
    } else if (
      playerTotal === 6 &&
      playerTotalCards === 2 &&
      bankerTotal === 7 &&
      bankerTotalCards === 2
    ) {
      // console.log("Banker BBQ's player!");
    } else if (
      bankerWins === true &&
      playerTotalCards === 3 &&
      playerTotal === 8
    ) {
      // console.log("Banker killed the Panda!");
    } else if (
      playerWins === true &&
      bankerTotalCards === 3 &&
      bankerTotal === 7
    ) {
      // console.log("Player killed the Dragon!");
    } else {
      console.log("No bonuses ocurred this hand");
    }
    // console.log("resultIsADragon=", resultIsADragon);
    // console.log("resultIsAPanda=", resultIsAPanda);
    // console.log("resultIsATie=", resultIsATie);

    countHandTotals(
    playerWins,
    bankerWins,
    resultIsATie,
    tieHands,
    dragon7Hands,
    panda8Hands,
    totalHands);
  }

  function countHandTotals(
    playerWins,
    bankerWins,
    resultIsATie,
    tieHands,
    dragon7Hands,
    panda8Hands,
    totalHands) {
    //
    // console.log("countHandTotals fires");
    // console.log("playerWins=", playerWins);
    // console.log("bankerWins=", bankerWins);
    // console.log("resultIsATie=", resultIsATie);
    if (playerWins === true) {
      playerWinningHands++;
    } else if (bankerWins === true) {
      bankerWinningHands++;
    } else if (resultIsATie === true) {
      tieHands++;
    } else {
      console.log("Error in countHandTotals");
    }
    totalHands++;

    // console.log("totalHands=", totalHands);
    // console.log("playerWinningHands=", playerWinningHands);
    // console.log("bankerWinningHands=", bankerWinningHands);
    // console.log("tieHands=", tieHands);
    // console.log("dragon7Hands=", dragon7Hands);
    // console.log("panda8Hands=", panda8Hands);

    console.log(
      "Hand number:",
      totalHands,
      "Player Wins:",
      playerWinningHands,
      "Banker Wins:",
      bankerWinningHands,
      "Dragons:",
      dragon7Hands,
      "Ties:",
      tieHands,
      "Pandas:",
      panda8Hands
    );
    updateRunningChipTotal(playerTotal,
      bankerTotal);
  }

  function updateRunningChipTotal(playerTotal,
    bankerTotal) {
    // console.log("myRunningChipTotal1=", myRunningChipTotal);
    playerBet = document.getElementById("playerBet").value;
    bankerBet = document.getElementById("bankerBet").value;
    dragonBet = document.getElementById("dragonBet").value;
    tieBet = document.getElementById("tieBet").value;
    pandaBet = document.getElementById("pandaBet").value;

    // console.log("playerBet=", playerBet);
    // console.log("bankerBet=", bankerBet);
    // console.log("dragonBet=", dragonBet);
    // console.log("tieBet=", tieBet);
    // console.log("pandaBet=", pandaBet);
    console.log("playerTotal=", playerTotal);
    console.log("bankerTotal=", bankerTotal);

    myRunningChipTotal =
      myRunningChipTotal -
      playerBet -
      bankerBet -
      dragonBet -
      tieBet -
      pandaBet;

    // console.log(
    //   "myRunningChipTotal2, after betting but not getting cards=",
    //   myRunningChipTotal
    // );
    document.querySelector("#myChipTotal").innerHTML = myRunningChipTotal;
    // console.log("myRunningChipTotal3 after updating dom=", myRunningChipTotal);

    // console.log("playerWins=", playerWins);
    // console.log("bankerWins=", bankerWins);
    // console.log("resultIsADragon=", resultIsADragon);
    // console.log("resultIsATie=", resultIsATie);
    // console.log("resultIsAPanda=", resultIsAPanda);

    if (resultIsAPanda === true) {
      myRunningChipTotal =
        myRunningChipTotal + 2 * playerBet + 1 * pandaBet + 25 * pandaBet;
    } else if (resultIsADragon === true) {
      myRunningChipTotal =
        myRunningChipTotal + 1 * bankerBet + 1 * dragonBet + 40 * dragonBet;
    } else if (playerWins === true) {
      myRunningChipTotal = myRunningChipTotal + 2 * playerBet;
      if (playerBet) {
        console.log(
          "The PLAYER wins with",
          playerTotal,
          "points against the banker's",
          bankerTotal,
          ". You win",
          playerBet,
          "dollars."
        );
      } else if (bankerBet) {
        console.log("Sorry, the banker wins.");
      }
    } else if (bankerWins === true && resultIsADragon === false) {
      myRunningChipTotal = myRunningChipTotal + 2 * bankerBet;
      if (bankerBet) {
        console.log(
          "The BANKER wins with",
          bankerTotal,
          "points against the player's",
          playerTotal,
          ".You win",
          bankerBet,
          "dollars."
        );
      } else if (playerBet) {
        console.log("Sorry, the player wins");
      }
    } else if (resultIsATie === true) {
      myRunningChipTotal =
        myRunningChipTotal +
        1 * bankerBet +
        1 * playerBet +
        1 * tieBet +
        8 * tieBet;
    }

    // console.log("myRunningChipTotal4 after betting logic=", myRunningChipTotal);
    document.querySelector("#myChipTotal").innerHTML = "";
    document.querySelector("#myChipTotal").innerHTML = myRunningChipTotal;
    console.log("Your chip total is:", myRunningChipTotal);
    discardCards(playerHand, bankerHand, theDiscard);
  }

  function discardCards(playerHand, bankerHand, theDiscard) {
    // console.log("discardCards fires");

    for (let i = 0; i < playerHand.length; i++) {
      // console.log("player discard loop fires");
      theDiscard.push(playerHand[i]);
    }
    playerHand = [];
    for (let j = 0; j < bankerHand.length; j++) {
      // console.log("banker discard loop fires");
      theDiscard.push(bankerHand[j]);
    }
    bankerHand = [];
    // console.log("theDiscard.length=", theDiscard.length);
    // console.log("playerHand after discarding=", playerHand);
    // console.log("bankerHand after discarding=", bankerHand);

    // console.log("myRunningChipTotal6=", myRunningChipTotal);

    resetAll();
  }

  function resetAll() {
    // console.log("resetAll fires");
    playerTotal = null;
    bankerTotal = null;
    playerWins = false;
    bankerWins = false;
    resultIsATie = false;
    playerTotalCards = 0;
    bankerTotalCards = 0;
    seeIfThereIsEnoughMoney();
  }

  function seeIfThereIsEnoughMoney() {
    if (myRunningChipTotal === 0) {
      console.log("You have run out of money. Please restart the game.");
      stop();
    }
    seeIfThereAreEnoughCards(theShoe);
  }

  function seeIfThereAreEnoughCards(theShoe) {
    // console.log("seeIfThereAreEnoughCards fires");
    // console.log("theShoe.length:", theShoe.length);
    if (theShoe.length < 52) {
      console.log("The cut card is out. Please reshuffle.");
      stop();
    }
    console.log("-------------------Hand is over------------------------>");
  }

  function stop() {
    console.log("Game stopped. Shuffle the deck again to reset.");
    document.getElementById("dealButton").disabled = true;
    playerWinningHands = 0;
    bankerWinningHands = 0;
    tieHands = 0;
    dragon7Hands = 0;
    panda8Hands = 0;
    totalHands = 0;
  }
}
