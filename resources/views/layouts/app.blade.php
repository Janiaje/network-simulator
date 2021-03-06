<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    @yield('styles')

</head>
<body>
<div id="app">
    <nav ref="navbar" class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container noselect">
            <a class="navbar-brand">
                {{ config('app.name', 'Laravel') }}
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="{{ __('Toggle navigation') }}">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="modificationDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Edit
                        </a>
                        <div class="dropdown-menu" aria-labelledby="modificationDropdown">
                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#importGraph">
                                Import
                            </a>
                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#exportGraph">
                                Export
                            </a>

                            <div class="dropdown-divider"></div>

                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#generateGraph">
                                Generate
                            </a>
                            <a class="dropdown-item" href="#" @click="editGraph">Edit</a>

                            <div class="dropdown-divider"></div>

                            <a class="dropdown-item" href="#" @click="clearGraph">Clear</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="modificationDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            View
                        </a>
                        <div class="dropdown-menu" aria-labelledby="modificationDropdown">
                            <a class="dropdown-item" href="#" @click="resetView">
                                Reset view
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="showDegrees"
                                           v-model="showDegrees">
                                    <label class="custom-control-label" for="showDegrees">Degrees</label>
                                </div>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="physicsAllowedMenu"
                                           v-model="physicsAllowed">
                                    <label class="custom-control-label" for="physicsAllowedMenu">Physics</label>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="analyticsDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Analyse
                        </a>
                        <div class="dropdown-menu" aria-labelledby="analyticsDropdown">
                            <a class="dropdown-item" href="#">
                                <input type="text" class="form-control" placeholder="Filter" v-model="analysesFilter">
                            </a>
                            <a
                                class="dropdown-item"
                                href="#"
                                @click="showAnalysis(analysis.analysis)"
                                v-for="analysis in analysesMenuItems"
                                v-html="analysis.name"
                            ></a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="simulationDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Simulate
                        </a>
                        <div class="dropdown-menu" aria-labelledby="simulationDropdown">
                            <a class="dropdown-item" href="#">
                                <input type="text" class="form-control" placeholder="Filter"
                                       v-model="simulationsFilter">
                            </a>
                            <a
                                class="dropdown-item"
                                href="#"
                                @click="runSimulation(simulation.simulation)"
                                v-for="simulation in simulationsMenuItems"
                                v-html="simulation.name"
                            ></a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="simulationDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            About
                        </a>
                        <div class="dropdown-menu" aria-labelledby="simulationDropdown">
                            <a class="dropdown-item"
                               href="https://github.com/Janiaje/graph-simulator/issues/new/choose"
                               target="_blank">Request a feature</a>
                            <a class="dropdown-item"
                               href="https://github.com/Janiaje/graph-simulator/issues/new?assignees=Janiaje&labels=bug&template=bug_report.md&title="
                               target="_blank">Report a bug</a>
                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#about">About</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <main :style="{ height: graphHeight + 'px' }">
        <home/>
    </main>

</div>
</body>
<!-- Scripts -->
@yield('scripts')
</html>
