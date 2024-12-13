import { Routes, Route } from "react-router";
import { Home } from "./main-area/home";
import { AddMoney } from "./main-area/add-money";
import { Profile } from "./main-area/profile";
import { Game } from "./main-area/game";
import { SingleDigit } from "./main-area/game/SubGame/SingleDigit";
import { JodiDigit } from "./main-area/game/SubGame/JodiDigit";
import { SinglePanna } from "./main-area/game/SubGame/SinglePanna";
import { DoublePanna } from "./main-area/game/SubGame/DoublePanna";
import { TriplePanna } from "./main-area/game/SubGame/TriplePanna";
import { HalfSangam } from "./main-area/game/SubGame/HalfSangam";
import { FullSangam } from "./main-area/game/SubGame/FullSangam";
import { Spdptp } from "./main-area/game/SubGame/Spdptp";
import Notification from "./main-area/notification";
import { WithdrawMoney } from "./main-area/withdraw-money";
import { BetHistory } from "./main-area/bet-history";

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/withdraw-money" element={<WithdrawMoney />} />
      <Route path="/add-money" element={<AddMoney />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/bid-history" element={<BetHistory />} />
      <Route path="/games/:game" element={<Game />} />
      <Route path="/games/:game/single-digit" element={<SingleDigit />} />
      <Route path="/games/:game/jodi-digit" element={<JodiDigit />} />
      <Route path="/games/:game/single-panna" element={<SinglePanna />} />
      <Route path="/games/:game/double-panna" element={<DoublePanna />} />
      <Route path="/games/:game/triple-panna" element={<TriplePanna />} />
      <Route path="/games/:game/half-sangam" element={<HalfSangam />} />
      <Route path="/games/:game/full-sangam" element={<FullSangam />} />
      <Route path="/games/:game/spdptp" element={<Spdptp />} />
    </Routes>
  );
}

export default AuthenticatedRoutes;
