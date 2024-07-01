import { UserCircle } from "@phosphor-icons/react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import * as Label from "@radix-ui/react-label";
import * as Menubar from "@radix-ui/react-menubar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTimerContext } from "../../contexts/TimerContext";
import { ModalAlterarSenha } from "../ModalAlterarSenha/ModalAlterarSenha";
import { ModalWhatsApp } from "../ModalWhatsApp/ModalWhatsApp";
import { ContainerNavBar } from "./styles";
import "./styles.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user, isAuthenticated } = useAuthContext();
  const { stopTimer } = useTimerContext();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return isAuthenticated ? (
    <>
      <ContainerNavBar>
        <Menubar.Root className="MenubarRoot">
          <Link className="linkRoute" to="/home">
            <img src="/assets/images/logo_white.png" alt="Logo" />
          </Link>

          <Menubar.Menu>
            <Menubar.Trigger className="MenubarTrigger">
              Atendimento
            </Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content
                className="MenubarContent"
                align="start"
                sideOffset={5}
                alignOffset={-3}
              >
                <Menubar.Sub>
                  <Menubar.Item className="MenubarItem">
                    <Link className="linkRoute" to="/atendimento">
                      Novo Atendimento
                    </Link>
                  </Menubar.Item>
                </Menubar.Sub>
                <Menubar.Separator className="MenubarSeparator" />
                <Menubar.Sub>
                  <Menubar.Item className="MenubarItem">
                    <Link className="linkRoute" to="/historicoAtendimento">
                      Histórico de Atendimentos
                    </Link>
                  </Menubar.Item>
                </Menubar.Sub>
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>

          <Menubar.Menu>
            <Menubar.Trigger className="MenubarTrigger">
              Administração
            </Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content
                className="MenubarContent"
                align="start"
                sideOffset={5}
                alignOffset={-3}
              >
                <Menubar.Sub>
                  <Menubar.SubTrigger className="MenubarSubTrigger">
                    Consumidor
                    <div className="RightSlot">
                      <ChevronRightIcon />
                    </div>
                  </Menubar.SubTrigger>

                  <Menubar.Portal>
                    <Menubar.SubContent
                      className="MenubarSubContent"
                      alignOffset={-5}
                    >
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/consumidor">
                          Consumidor
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        Tipo de Consumidor
                      </Menubar.Item>
                    </Menubar.SubContent>
                  </Menubar.Portal>
                </Menubar.Sub>
                <Menubar.Sub>
                  <Menubar.SubTrigger className="MenubarSubTrigger">
                    Produtos
                    <div className="RightSlot">
                      <ChevronRightIcon />
                    </div>
                  </Menubar.SubTrigger>

                  <Menubar.Portal>
                    <Menubar.SubContent
                      className="MenubarSubContent"
                      alignOffset={-5}
                    >
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/produtos">
                          Composição de Produtos
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/grupo">
                          Grupo
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/indicador1">
                          Linha
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/marca">
                          Marca
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/categoria">
                          Categoria
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/embalagem">
                          Embalagem
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/indicador5">
                          Indicador 5
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                    </Menubar.SubContent>
                  </Menubar.Portal>
                </Menubar.Sub>
                <Menubar.Sub>
                  <Menubar.SubTrigger className="MenubarSubTrigger">
                    Atendimento
                    <div className="RightSlot">
                      <ChevronRightIcon />
                    </div>
                  </Menubar.SubTrigger>

                  <Menubar.Portal>
                    <Menubar.SubContent
                      className="MenubarSubContent"
                      alignOffset={-5}
                    >
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/manifestacao">
                          Manifestação
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link
                          className="linkRoute"
                          to="/complementoManifestacao"
                        >
                          Complemento
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link
                          className="linkRoute"
                          to="/subComplementoManifestacao"
                        >
                          Sub-Complemento
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/acoes">
                          Ações
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/contatos">
                          Meios de Contatos
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/origem">
                          Origem
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/urgencia">
                          Urgência
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                    </Menubar.SubContent>
                  </Menubar.Portal>
                </Menubar.Sub>

                <Menubar.Sub>
                  <Menubar.SubTrigger className="MenubarSubTrigger">
                    Usuários
                    <div className="RightSlot">
                      <ChevronRightIcon />
                    </div>
                  </Menubar.SubTrigger>

                  <Menubar.Portal>
                    <Menubar.SubContent
                      className="MenubarSubContent"
                      alignOffset={-5}
                    >
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/usuarios">
                          Usuários
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                    </Menubar.SubContent>
                  </Menubar.Portal>
                </Menubar.Sub>
                <Menubar.Sub>
                  <Menubar.SubTrigger className="MenubarSubTrigger">
                    Endereços
                    <div className="RightSlot">
                      <ChevronRightIcon />
                    </div>
                  </Menubar.SubTrigger>

                  <Menubar.Portal>
                    <Menubar.SubContent
                      className="MenubarSubContent"
                      alignOffset={-5}
                    >
                      <Menubar.Item className="MenubarItem">
                        <Link className="linkRoute" to="/pais">
                          País
                        </Link>
                      </Menubar.Item>
                      <Menubar.Separator className="MenubarSeparator" />
                    </Menubar.SubContent>
                  </Menubar.Portal>
                </Menubar.Sub>
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>

          <Menubar.Menu>
            <Menubar.Trigger className="MenubarTrigger">
              Relatórios
            </Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content
                className="MenubarContent"
                align="start"
                sideOffset={5}
                alignOffset={-14}
              >
                <Menubar.Item className="MenubarItem inset">
                  <Link className="linkRoute" to="/relatorios">
                    Relatório
                  </Link>
                </Menubar.Item>
                <Menubar.Item className="MenubarItem inset">
                  <Link className="linkRoute" to="/relatorios/contatoSemAcao">
                    Contatos Sem Ação
                  </Link>
                </Menubar.Item>
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>
        </Menubar.Root>

        <Menubar.Root className="MenubarRootRight">
          <Menubar.Menu className="menuRight">
            <ModalWhatsApp />
          </Menubar.Menu>

          <Menubar.Menu className="menuRight">
            <Menubar.Trigger
              className="MenubarTrigger"
              onClick={handleMenuToggle}
            >
              <UserCircle size={30} />
            </Menubar.Trigger>
            {menuOpen && isAuthenticated && (
              <Menubar.Portal>
                <Menubar.Content
                  className="MenubarContent"
                  align="start"
                  sideOffset={5}
                  alignOffset={-14}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Label.Root className="LabelRoot">
                      {user.usuario}
                    </Label.Root>
                  </div>

                  <Menubar.Item
                    onClick={() => setOpen(true)}
                    className="MenubarItem inset"
                  >
                    <div className="linkRoute">Alterar senha</div>
                  </Menubar.Item>

                  <Menubar.Item
                    onClick={() => {
                      logout({
                        callback: () => {},
                      });
                      stopTimer();

                      closeMenu();
                      navigate("/login");
                    }}
                    className="MenubarItem inset"
                  >
                    <Link className="linkRoute">Logout</Link>
                  </Menubar.Item>
                </Menubar.Content>
              </Menubar.Portal>
            )}
          </Menubar.Menu>
        </Menubar.Root>
      </ContainerNavBar>
      <ModalAlterarSenha
        open={open}
        handleChangeOpen={value => setOpen(value)}
      ></ModalAlterarSenha>
    </>
  ) : null;
};
